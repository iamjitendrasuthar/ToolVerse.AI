import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";
import CategoryClient from "@/components/CategoryClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  await connectToDatabase();

  const tools = await Tool.find()
    .or([
      {
        category: {
          $regex: new RegExp(slug.replace(/-/g, " "), "i"),
        },
      },
      {
        slug: {
          $regex: new RegExp(slug, "i"),
        },
      },
    ])
    .lean();

  return (
    <CategoryClient
      initialTools={JSON.parse(JSON.stringify(tools))}
      slug={slug}
    />
  );
}
