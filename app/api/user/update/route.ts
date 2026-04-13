import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, mobile, profession } = await req.json();

    // Basic Validation
    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and Email are required" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        email,
        mobile,
        profession: profession,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Update Error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
