import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";
import NewArrivalsClient from "@/components/NewArrivalsClient";

export default async function Page() {
  await connectToDatabase();

  // Fetch top 20 newly added tools sorted by creation date (newest first)
  const tools = await Tool.find().sort({ createdAt: -1 }).limit(20).lean();

  return <NewArrivalsClient initialTools={JSON.parse(JSON.stringify(tools))} />;
}
