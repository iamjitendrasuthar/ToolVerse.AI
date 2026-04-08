import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";
import UseCaseClient from "@/components/UseCaseClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  await connectToDatabase();

  // Query updated to search within the 'useCases' array instead of 'category'
  const tools = await Tool.find()
    .or([
      {
        useCases: {
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
    <UseCaseClient
      initialTools={JSON.parse(JSON.stringify(tools))}
      slug={slug}
    />
  );
}
