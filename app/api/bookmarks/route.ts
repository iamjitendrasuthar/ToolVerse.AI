import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const bookmarkIds: string[] = user.bookmarkIds || [];

    await connectToDatabase();

    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection not found");
    }

    const bookmarkedTools =
      bookmarkIds.length > 0
        ? await db
            .collection("tools")
            .find({
              _id: {
                $in: bookmarkIds.map((id) => new ObjectId(id)),
              },
            })
            .toArray()
        : [];

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        bookmarkIds,
      },
      bookmarks: bookmarkedTools,
      count: bookmarkedTools.length,
    });
  } catch (error) {
    console.error("Fetch Bookmarks Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
