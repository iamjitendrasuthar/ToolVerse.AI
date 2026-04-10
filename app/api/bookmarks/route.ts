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
      where: {
        email: session.user.email,
      },
      select: {
        bookmarkIds: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (!user.bookmarkIds || user.bookmarkIds.length === 0) {
      return NextResponse.json({
        success: true,
        bookmarks: [],
        count: 0,
      });
    }

    // MongoDB connection
    const connection = await connectToDatabase();

    // Native MongoDB db instance
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection not found");
    }

    const bookmarkedTools = await db
      .collection("tools")
      .find({
        _id: {
          $in: user.bookmarkIds.map((id) => new ObjectId(id)),
        },
      })
      .toArray();

    return NextResponse.json({
      success: true,
      bookmarks: bookmarkedTools,
      count: bookmarkedTools.length,
    });
  } catch (error) {
    console.error("Fetch Bookmarks Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
