import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";

export async function GET() {
  try {
    await connectToDatabase();

    const tools = await Tool.find(
      {},
      "name slug category pricing rating imageUrl websiteUrl",
    ).lean();

    const uniqueCategories = Array.from(
      new Set(tools.map((t: any) => t.category)),
    )
      .filter(Boolean)
      .map((cat) => ({
        name: cat,
        slug: cat.toLowerCase().replace(/ /g, "-"),
        href: `/category/${cat.toLowerCase().replace(/ /g, "-")}`,
      }));

    const toolsData = tools.map((t: any) => ({
      name: t.name,
      slug: t.slug,
      category: t.category,
      href: `/tool/${t.slug}`,
      rating: t.rating,
      imageUrl: t.imageUrl,
      websiteUrl: t.websiteUrl,
    }));

    return NextResponse.json({
      tools: toolsData,
      categories: uniqueCategories,
    });
  } catch (error) {
    console.error("Search API Error:", error);

    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
