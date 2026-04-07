import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    subCategory: {
      type: String,
      trim: true,
      default: "",
    },

    pricing: {
      type: String,
      enum: ["Free", "Paid", "Freemium"],
      required: true,
    },

    pricingDetails: {
      monthlyPrice: {
        type: Number,
        default: 0,
        min: 0,
      },
      yearlyPrice: {
        type: Number,
        default: 0,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
        uppercase: true,
        trim: true,
      },
    },

    websiteUrl: {
      type: String,
      required: true,
      trim: true,
    },

    affiliateUrl: {
      type: String,
      default: "",
      trim: true,
    },

    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },

    screenshots: [
      {
        type: String,
        trim: true,
      },
    ],

    logo: {
      type: String,
      default: "",
      trim: true,
    },

    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    demoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    clickCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    shareCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    bookmarkCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    pros: [
      {
        type: String,
        trim: true,
      },
    ],

    cons: [
      {
        type: String,
        trim: true,
      },
    ],

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    searchableKeywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    searchAliases: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    useCases: [
      {
        type: String,
        enum: [
          "Students",
          "Teachers",
          "Designers",
          "Developers",
          "Content Creators",
          "Startups",
          "Marketing",
        ],
      },
    ],

    industries: [
      {
        type: String,
        trim: true,
      },
    ],

    integrations: [
      {
        type: String,
        trim: true,
      },
    ],

    languages: [
      {
        type: String,
        trim: true,
      },
    ],

    supportedCountries: [
      {
        type: String,
        trim: true,
      },
    ],

    platforms: [
      {
        type: String,
        enum: ["Web", "Android", "iOS", "API", "Chrome Extension"],
      },
    ],

    aiType: {
      type: String,
      enum: [
        "Text Generation",
        "Image Generation",
        "Video Generation",
        "Audio Generation",
        "Code Assistant",
        "Chatbot",
        "Automation",
        "Research",
        "Productivity",
      ],
    },

    toolPurpose: {
      type: String,
      trim: true,
      default: "",
    },

    difficultyLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    teamSize: {
      type: String,
      enum: ["Solo", "Small Team", "Enterprise"],
      default: "Solo",
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    foundedYear: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
    },

    country: {
      type: String,
      trim: true,
      default: "",
    },

    supportEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    officialSocials: {
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
      discord: { type: String, default: "" },
    },

    freeTrialAvailable: {
      type: Boolean,
      default: false,
    },

    openSource: {
      type: Boolean,
      default: false,
    },

    apiAvailable: {
      type: Boolean,
      default: false,
    },

    mobileAppAvailable: {
      type: Boolean,
      default: false,
    },

    chromeExtensionAvailable: {
      type: Boolean,
      default: false,
    },

    loginRequired: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    trending: {
      type: Boolean,
      default: false,
    },

    sponsored: {
      type: Boolean,
      default: false,
    },

    stats: {
      monthlyUsers: {
        type: Number,
        default: 0,
      },
      totalVisits: {
        type: Number,
        default: 0,
      },
      averageSessionTime: {
        type: Number,
        default: 0,
      },
      bounceRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },

    seo: {
      metaTitle: {
        type: String,
        default: "",
      },
      metaDescription: {
        type: String,
        default: "",
      },
      keywords: [
        {
          type: String,
          trim: true,
        },
      ],
    },

    faqs: [
      {
        question: {
          type: String,
          trim: true,
        },
        answer: {
          type: String,
          trim: true,
        },
      },
    ],

    alternatives: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool",
      },
    ],

    relatedTools: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool",
      },
    ],

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
    },

    submittedBy: {
      type: String,
      default: "",
    },

    lastUpdatedBy: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
//
// INDEXES
//

// Unique + Fast Lookup
ToolSchema.index({ slug: 1 }, { unique: true });
ToolSchema.index({ name: 1 });
ToolSchema.index({ websiteUrl: 1 });

// Category / Filtering
ToolSchema.index({ category: 1 });
ToolSchema.index({ subCategory: 1 });
ToolSchema.index({ pricing: 1 });
ToolSchema.index({ aiType: 1 });
ToolSchema.index({ difficultyLevel: 1 });
ToolSchema.index({ teamSize: 1 });
ToolSchema.index({ platforms: 1 });
ToolSchema.index({ useCases: 1 });
ToolSchema.index({ industries: 1 });
ToolSchema.index({ integrations: 1 });
ToolSchema.index({ languages: 1 });
ToolSchema.index({ supportedCountries: 1 });
ToolSchema.index({ companyName: 1 });
ToolSchema.index({ country: 1 });

// Boolean Filters
ToolSchema.index({ featured: 1 });
ToolSchema.index({ trending: 1 });
ToolSchema.index({ sponsored: 1 });
ToolSchema.index({ verified: 1 });
ToolSchema.index({ openSource: 1 });
ToolSchema.index({ apiAvailable: 1 });
ToolSchema.index({ mobileAppAvailable: 1 });
ToolSchema.index({ chromeExtensionAvailable: 1 });
ToolSchema.index({ freeTrialAvailable: 1 });
ToolSchema.index({ loginRequired: 1 });

// Sorting Indexes
ToolSchema.index({ rating: -1 });
ToolSchema.index({ totalReviews: -1 });
ToolSchema.index({ views: -1 });
ToolSchema.index({ clickCount: -1 });
ToolSchema.index({ shareCount: -1 });
ToolSchema.index({ bookmarkCount: -1 });
ToolSchema.index({ createdAt: -1 });
ToolSchema.index({ updatedAt: -1 });

// Compound Indexes for Common Queries
ToolSchema.index({ category: 1, featured: 1 });
ToolSchema.index({ category: 1, pricing: 1 });
ToolSchema.index({ category: 1, rating: -1 });
ToolSchema.index({ category: 1, trending: 1, rating: -1 });
ToolSchema.index({ pricing: 1, rating: -1 });
ToolSchema.index({ featured: 1, rating: -1 });
ToolSchema.index({ trending: 1, rating: -1 });
ToolSchema.index({ verified: 1, rating: -1 });
ToolSchema.index({ aiType: 1, rating: -1 });
ToolSchema.index({ platforms: 1, rating: -1 });
ToolSchema.index({ companyName: 1, rating: -1 });
ToolSchema.index({ createdAt: -1, rating: -1 });

// Full Text Search Index
ToolSchema.index({
  name: "text",
  shortDescription: "text",
  description: "text",
  category: "text",
  subCategory: "text",
  features: "text",
  tags: "text",
  searchableKeywords: "text",
  searchAliases: "text",
  useCases: "text",
  industries: "text",
  integrations: "text",
  aiType: "text",
  toolPurpose: "text",
  companyName: "text",
  country: "text",
  languages: "text",
});

// Optional Weighted Text Search
ToolSchema.index(
  {
    name: "text",
    shortDescription: "text",
    description: "text",
    searchableKeywords: "text",
    searchAliases: "text",
    tags: "text",
  },
  {
    weights: {
      name: 10,
      searchableKeywords: 8,
      searchAliases: 7,
      tags: 5,
      shortDescription: 4,
      description: 2,
    },
    name: "ToolTextSearchIndex",
  },
);

export default mongoose.models.Tool || mongoose.model("Tool", ToolSchema);
