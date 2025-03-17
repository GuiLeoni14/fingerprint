import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const response = await req.json();
  const fingerprint = response?.fingerprint as string
   
  if (!fingerprint) {
    return NextResponse.json({ message: "Nome e fingerprint são obrigatórios!" }, { status: 400 });
  }


  console.log("fingerprint", fingerprint)
  // Verificar se o usuário existe e se a fingerprint bate
  const user = await prisma.user.findUnique({ where: { 
    fingerprint,
   } });

  if (!user) {
    return NextResponse.json({ message: "Usuário não encontrado!" }, { status: 404 });
  }

  return NextResponse.json({ message: "Acesso permitido!", user });
}
