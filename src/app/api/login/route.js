import { generateToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const { username, password } = await request.json()
    const user = await prisma.admin_account.findFirst({
      where: {
        username,
        password
      }
    })
    
    if(!user) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      )
    }
    
    const token = await generateToken(user)
    
    const response = NextResponse.json(
      { message: "Login berhasil", role: user.role },
      { status: 200 }
    )
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8,
      path: '/',
      sameSite: 'strict'
    })
    
    return response
  } finally {
    await prisma.$disconnect()
  }
}