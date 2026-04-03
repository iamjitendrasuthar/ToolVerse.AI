import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    pricing: {
      type: String,
      enum: ["Free", "Paid", "Freemium"], // 'Free' enum mein hona chahiye
      required: true,
    },
    websiteUrl: { type: String, required: true },
    imageUrl: { type: String }, // <--- YEH LINE ADD KAREIN
    logo: { type: String },
    rating: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    pros: [{ type: String }],
    cons: [{ type: String }],
    features: [{ type: String }],
  },
  { timestamps: true },
);

export default mongoose.models.Tool || mongoose.model("Tool", ToolSchema);
