"use client";

import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function Home() {
  const [name, setName] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [inputFingerprint, setInputFingerprint] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});

  // Captura a fingerprint ao carregar a página
  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };
    getFingerprint();
  }, []);

  async function register() {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, fingerprint }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMessage(data.message);
  }

  async function validate() {
    const res = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify({ fingerprint: inputFingerprint }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setMessage(data.message);
    setUser(data.user)
  }

  function copyFingerprint() {
    navigator.clipboard.writeText(fingerprint);
    setMessage("Fingerprint copiada!");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Fingerprint Authentication
        </h1>
        
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome para registrar"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-gray-50 text-gray-600 cursor-pointer text-center text-sm select-all"
          onClick={copyFingerprint}
        >
          {fingerprint || "Gerando fingerprint..."}
        </div>

        <input
          value={inputFingerprint}
          onChange={(e) => setInputFingerprint(e.target.value)}
          placeholder="Cole a fingerprint para validar"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <div className="flex justify-between">
          <button
            onClick={register}
            className="w-[48%] bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Registrar
          </button>
          
          <button
            onClick={validate}
            className="w-[48%] bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Validar
          </button>
        </div>
        
        {message && (
          <p className="mt-4 text-center text-gray-700 font-medium">
            {message}
          </p>
        )}
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}
