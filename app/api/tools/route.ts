import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";

export async function GET() {
  try {
    // 1. Connect DB
    await connectToDatabase();

    // 2. Fetch tools from MongoDB
    const tools = await Tool.find()
      .select("_id name slug category pricing rating imageUrl websiteUrl")
      .lean();

    // 3. Format tools data
    const toolsData = tools.map((tool: any) => ({
      _id: tool._id.toString(),
      name: tool.name,
      slug: tool.slug,
      category: tool.category || "uncategorized",
      pricing: tool.pricing || null,
      rating: tool.rating || 0,
      imageUrl: tool.imageUrl || null,
      websiteUrl: tool.websiteUrl || null,
      href: `/tool/${tool.slug}`,
    }));

    // 4. Create categories from tools
    const categoryMap = new Map();

    tools.forEach((tool: any) => {
      const category = tool.category || "uncategorized";
      const slug = category.toLowerCase().replace(/\s+/g, "-");

      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          slug,
          href: `/category/${slug}`,
        });
      }
    });

    const categories = Array.from(categoryMap.values());

    // 5. Return response
    return NextResponse.json({
      success: true,
      tools: toolsData,
      categories,
      count: toolsData.length,
    });
  } catch (error) {
    console.error("Tools API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tools",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
