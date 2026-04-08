import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";
import TrendingClient from "@/components/TrendingClient";

export default async function Page() {
  await connectToDatabase();

  const tools = await Tool.find()
    .sort({ views: -1 })
    .limit(12)
    .lean();

  return <TrendingClient initialTools={JSON.parse(JSON.stringify(tools))} />;
}
