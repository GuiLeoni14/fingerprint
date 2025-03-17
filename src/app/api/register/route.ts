import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, fingerprint } = await req.json();

  // Gerar fingerprint do usuário
  console.log("fingerprint", fingerprint)
  // Salvar no banco
  const user = await prisma.user.create({
    data: { name, fingerprint }
  });

  return NextResponse.json({ message: "Usuário registrado!", user });
}
