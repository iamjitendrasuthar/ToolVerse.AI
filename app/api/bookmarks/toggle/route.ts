import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Session check
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { toolId } = await req.json();

    if (!toolId) {
      return NextResponse.json(
        { message: "Tool ID is required" },
        { status: 400 },
      );
    }

    // 2. Fetch current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { bookmarkIds: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 3. Logic: Toggle bookmark
    const isBookmarked = user.bookmarkIds.includes(toolId);

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        bookmarkIds: isBookmarked
          ? { set: user.bookmarkIds.filter((id) => id !== toolId) }
          : { push: toolId },
      },
    });

    return NextResponse.json({
      success: true,
      message: isBookmarked ? "Removed" : "Added",
      isBookmarked: !isBookmarked,
      count: updatedUser.bookmarkIds.length,
    });
  } catch (error) {
    console.error("Bookmark Toggle Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
