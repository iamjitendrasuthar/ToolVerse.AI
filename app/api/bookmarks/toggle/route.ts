import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { toolId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    let bookmarkIds: string[] = user.bookmarkIds || [];

    if (bookmarkIds.includes(toolId)) {
      bookmarkIds = bookmarkIds.filter((id) => id !== toolId);
    } else {
      bookmarkIds.push(toolId);
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { bookmarkIds },
    });

    return NextResponse.json({
      success: true,
      bookmarkIds: updatedUser.bookmarkIds,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
