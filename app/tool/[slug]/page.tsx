import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";
import ToolDetailClient from "@/components/ToolDetailClient";
import { notFound } from "next/navigation";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  await connectToDatabase();
  // @ts-ignore
  const tool = await Tool.findOne({ slug: slug }).lean();

  if (!tool) {
    notFound();
  }

  const allTools = await Tool.find(
    {} as any,
    "name slug rating pricing category websiteUrl aiType difficultyLevel integrations platforms languages",
  ).lean();

  const serializedTool = JSON.parse(JSON.stringify(tool));
  const serializedAllTools = JSON.parse(JSON.stringify(allTools));

  return (
    <ToolDetailClient tool={serializedTool} allTools={serializedAllTools} />
  );
}
