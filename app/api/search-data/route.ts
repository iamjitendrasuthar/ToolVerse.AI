import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";

type ToolType = {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  pricing?: string;
  rating?: number;
  imageUrl?: string;
  websiteUrl?: string;
};

export async function GET() {
  try {
    await connectToDatabase();

    const tools = (await Tool.find()
      .select("_id name slug category pricing rating imageUrl websiteUrl")
      .lean()) as ToolType[];

    const uniqueCategories = Array.from(
      new Set(
        tools
          .map((t) => t.category)
          .filter((category): category is string => Boolean(category)),
      ),
    ).map((cat) => ({
      name: cat,
      slug: cat.toLowerCase().replace(/ /g, "-"),
      href: `/category/${cat.toLowerCase().replace(/ /g, "-")}`,
    }));

    const toolsData = tools.map((t: any) => ({
      _id: t._id.toString(),
      name: t.name,
      slug: t.slug,
      category: t.category,
      pricing: t.pricing,
      href: `/tool/${t.slug}`,
      rating: t.rating,
      imageUrl: t.imageUrl,
      websiteUrl: t.websiteUrl,
    }));

    return NextResponse.json({
      success: true,
      tools: toolsData,
      categories: uniqueCategories,
    });
  } catch (error) {
    console.error("Tools API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tools",
      },
      { status: 500 },
    );
  }
}
