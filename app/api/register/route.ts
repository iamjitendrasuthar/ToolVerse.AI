import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 },
    );
  }
}
