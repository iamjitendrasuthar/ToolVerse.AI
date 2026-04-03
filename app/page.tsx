import connectToDatabase from "@/lib/mongodb";
import Tool from "@/models/Tool";
import HomeClient from "@/components/HomeClient";

export default async function HomePage() {
  await connectToDatabase();

  const allTools = await Tool.find().lean();

  const categoriesMap = allTools.reduce((acc: any, tool: any) => {
    const catName = tool.category;

    if (!acc[catName]) {
      acc[catName] = {
        name: catName,
        slug: catName.toLowerCase().replace(/ /g, "-"),
        tools: [],
      };
    }

    if (acc[catName].tools.length < 3) {
      acc[catName].tools.push({
        ...tool,
        _id: tool._id.toString(),
      });
    }

    return acc;
  }, {});

  const categoryData = Object.values(categoriesMap);

  return <HomeClient categoryData={categoryData} />;
}
