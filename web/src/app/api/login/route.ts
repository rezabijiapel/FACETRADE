import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Dummy check
  if (email === "test@example.com" && password === "123456") {
    return NextResponse.json({ message: "Login berhasil!" });
  }

  return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
}
