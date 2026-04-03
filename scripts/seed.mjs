import mongoose from "mongoose";

// Apna MongoDB connection string yahan daalein
const MONGODB_URI =
  "mongodb+srv://iamjitendrasuthar24:zawxse11@cluster0.xnejlnk.mongodb.net/ToolsVerseAi?retryWrites=true&w=majority";

const aiTools = [
  // --- CODING TOOLS ---
  {
    name: "Cursor",
    slug: "cursor",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://cursor.sh",
    rating: 4.9,
    description: "The AI-first code editor built for pair programming.",
    imageUrl: "https://cursor.com/public/opengraph-image.png",
  },
  {
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "Coding Tools",
    pricing: "Paid",
    websiteUrl: "https://github.com",
    rating: 4.8,
    description: "Your AI pair programmer suggesting code in real-time.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx_vYilTxt0bKgL-hCmIjDvB7yxabY4gRX1g&s",
  },
  {
    name: "Gemini",
    slug: "gemini",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://gemini.google.com",
    rating: 4.8,
    description: "Google's advanced AI assistant for writing and research.",
    imageUrl:
      "https://static.vecteezy.com/system/resources/thumbnails/066/382/087/small_2x/gemini-artificial-intelligence-colorful-logo-deep-learning-isolated-illustration-free-vector.jpg",
  },
  {
    name: "Microsoft Copilot",
    slug: "microsoft-copilot",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://copilot.microsoft.com",
    rating: 4.7,
    description: "Microsoft AI assistant integrated with Windows and Office.",
    imageUrl:
      "https://i.pinimg.com/736x/b8/d1/83/b8d1830691c0c656e0ea84ccd05b1ac8.jpg",
  },
  {
    name: "Grok",
    slug: "grok",
    category: "Chat Tools",
    pricing: "Paid",
    websiteUrl: "https://x.ai",
    rating: 4.6,
    description: "AI chatbot by xAI with real-time X integration.",
    imageUrl:
      "https://i.pinimg.com/736x/af/c5/f1/afc5f1b6f2fda9067732ae7c45f94381.jpg",
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://deepseek.com",
    rating: 4.7,
    description: "AI coding and reasoning assistant.",
    imageUrl:
      "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/deepseek-color.png",
  },
  {
    name: "Codeium",
    slug: "codeium",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://codeium.com",
    rating: 4.7,
    description: "Free AI code completion tool for developers.",
    imageUrl: "https://avatars.githubusercontent.com/u/100720880?s=280&v=4",
  },
  {
    name: "Blackbox AI",
    slug: "blackbox-ai",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://blackbox.ai",
    rating: 4.5,
    description: "AI assistant for coding and code search.",
    imageUrl:
      "https://logomakerr.ai/uploads/output/2024/03/17/eb4670c2376a91c3aeb110c32c438df5.jpg?t=1710632784",
  },
  {
    name: "Tabnine",
    slug: "tabnine",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://tabnine.com",
    rating: 4.5,
    description: "Private AI code assistant for software teams.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3r3tJ9pcW0TwNQxvi1XV4hWagyRyeYDZbYg&s",
  },
  {
    name: "V0.dev",
    slug: "v0-dev",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://v0.dev",
    rating: 4.9,
    description: "Generates Shadcn UI components from text prompts.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Phind",
    slug: "phind",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://phind.com",
    rating: 4.8,
    description: "AI search engine for developers.",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop",
  },

  // --- IMAGE GENERATION ---
  {
    name: "Midjourney",
    slug: "midjourney",
    category: "Image Generation",
    pricing: "Paid",
    websiteUrl: "https://midjourney.com",
    rating: 4.9,
    description: "Most artistic AI image generator via Discord.",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "DALL-E 3",
    slug: "dall-e-3",
    category: "Image Generation",
    pricing: "Paid",
    websiteUrl: "https://openai.com",
    rating: 4.8,
    description: "OpenAI's latest model that understands complex prompts.",
    imageUrl:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Leonardo.ai",
    slug: "leonardo-ai",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://leonardo.ai",
    rating: 4.7,
    description: "Full creative suite for high-quality image assets.",
    imageUrl:
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Stable Diffusion",
    slug: "stable-diffusion",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://stability.ai",
    rating: 4.6,
    description: "Open-source image model that you can run locally.",
    imageUrl:
      "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Adobe Firefly",
    slug: "adobe-firefly",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://adobe.com",
    rating: 4.5,
    description: "Generative AI for designers, built into Photoshop.",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
  },

  // --- WRITING & CONTENT ---
  {
    name: "ChatGPT",
    slug: "chatgpt",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://openai.com",
    rating: 4.9,
    description: "The gold standard for conversational AI.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_dDFngiKgaxBTtb15M6ETmX61VVcawgBt4Q&s",
  },
  {
    name: "Claude 3.5 Sonnet",
    slug: "claude",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://anthropic.com",
    rating: 4.9,
    description: "Known for being more human-like and better at coding.",
    imageUrl:
      "https://hipaatimes.com/hubfs/Is%20Claude%20AI%20HIPAA%20compliant-1.jpg",
  },
  {
    name: "Grammarly AI",
    slug: "grammarly",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://grammarly.com",
    rating: 4.7,
    description: "AI writing assistant that improves clarity and tone.",
    imageUrl:
      "https://hi-tech.ua/wp-content/uploads/2020/05/grammarly-logo.jpg.webp",
  },
  {
    name: "QuillBot",
    slug: "quillbot",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://quillbot.com",
    rating: 4.7,
    description: "AI paraphrasing tool to rewrite sentences.",
    imageUrl:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Jasper",
    slug: "jasper",
    category: "Writing Tools",
    pricing: "Paid",
    websiteUrl: "https://jasper.ai",
    rating: 4.6,
    description: "AI copywriter for enterprise marketing teams.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
  },

  // --- VIDEO EDITING ---
  {
    name: "Runway Gen-3",
    slug: "runway",
    category: "Video Editing",
    pricing: "Paid",
    websiteUrl: "https://runwayml.com",
    rating: 4.8,
    description: "Professional grade text-to-video generation.",
    imageUrl: "https://miro.medium.com/1*0WLmVxreJSRlRcUzMEDDJw.jpeg",
  },
  {
    name: "HeyGen",
    slug: "heygen",
    category: "Video Editing",
    pricing: "Free",
    websiteUrl: "https://heygen.com",
    rating: 4.9,
    description: "Create AI avatars that talk like real people.",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Synthesia",
    slug: "synthesia",
    category: "Video Editing",
    pricing: "Paid",
    websiteUrl: "https://synthesia.io",
    rating: 4.7,
    description: "Professional AI video generation with digital humans.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Veed.io",
    slug: "veed-ai",
    category: "Video Editing",
    pricing: "Free",
    websiteUrl: "https://veed.io",
    rating: 4.7,
    description: "Online video editor with AI subtitles and more.",
    imageUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Descript",
    slug: "descript",
    category: "Video Editing",
    pricing: "Free",
    websiteUrl: "https://descript.com",
    rating: 4.7,
    description: "Edit video by editing the text transcript.",
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop",
  },

  // --- AUDIO TOOLS ---
  {
    name: "ElevenLabs",
    slug: "elevenlabs",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://elevenlabs.io",
    rating: 4.9,
    description: "Most realistic AI voice cloning and speech.",
    imageUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Suno AI",
    slug: "suno",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://suno.com",
    rating: 4.8,
    description: "Generate full songs with lyrics and vocals.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Udio",
    slug: "udio",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://udio.com",
    rating: 4.8,
    description: "High-fidelity AI music generation.",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253361-bee438875df0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Krisp",
    slug: "krisp",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://krisp.ai",
    rating: 4.8,
    description: "Removes background noise from calls.",
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Vocal Remover",
    slug: "vocal-remover",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://vocalremover.org",
    rating: 4.6,
    description: "Separate voice from music using AI.",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop",
  },

  // --- PRODUCTIVITY ---
  {
    name: "Notion AI",
    slug: "notion-ai",
    category: "Productivity Tools",
    pricing: "Paid",
    websiteUrl: "https://notion.so",
    rating: 4.8,
    description: "AI built directly into your notes and docs.",
    imageUrl:
      "https://www.auvaria.com/wp-content/uploads/2025/03/notion1411.jpg",
  },
  {
    name: "Perplexity",
    slug: "perplexity",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://perplexity.ai",
    rating: 4.9,
    description: "AI search engine with real-time sources.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJimqQnRuBIYJ9hKQ7ukrgF6Goa-_8FPH5Ng&s",
  },
  {
    name: "Gamma",
    slug: "gamma",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://gamma.app",
    rating: 4.8,
    description: "Beautiful presentations from text.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Otter.ai",
    slug: "otter",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://otter.ai",
    rating: 4.5,
    description: "AI meeting assistant for transcription.",
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Beautiful.ai",
    slug: "beautiful-ai",
    category: "Productivity Tools",
    pricing: "Paid",
    websiteUrl: "https://beautiful.ai",
    rating: 4.5,
    description: "Smart presentation templates.",
    imageUrl:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
  },

  // --- 3D & DESIGN ---
  {
    name: "Spline AI",
    slug: "spline-ai",
    category: "3D Tools",
    pricing: "Free",
    websiteUrl: "https://spline.design",
    rating: 4.7,
    description: "Generates 3D objects and scenes from text.",
    imageUrl:
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Luma AI",
    slug: "luma",
    category: "3D Tools",
    pricing: "Free",
    websiteUrl: "https://lumalabs.ai",
    rating: 4.8,
    description: "Capture life in 3D using your phone camera.",
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Logo AI",
    slug: "logo-ai",
    category: "Image Generation",
    pricing: "Paid",
    websiteUrl: "https://logoai.com",
    rating: 4.4,
    description: "AI logo maker for branding startups.",
    imageUrl:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bde7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "PromeAI",
    slug: "prome-ai",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://promeai.com",
    rating: 4.6,
    description: "Architectural design visualization tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Canva AI",
    slug: "canva-ai",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://canva.com",
    rating: 4.7,
    description: "Magic Studio by Canva makes design effortless.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop",
  },

  // --- OTHERS & MISC ---
  {
    name: "DeepL",
    slug: "deepl",
    category: "Translation Tools",
    pricing: "Free",
    websiteUrl: "https://deepl.com",
    rating: 4.9,
    description: "World's most accurate AI translator.",
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Character.ai",
    slug: "character-ai",
    category: "Chat Tools",
    pricing: "Free",
    websiteUrl: "https://character.ai",
    rating: 4.8,
    description: "Chat with fictional or historical characters.",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Hugging Face",
    slug: "hugging-face",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://huggingface.co",
    rating: 4.9,
    description: "The community building the future of AI.",
    imageUrl:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Monica AI",
    slug: "monica",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://monica.im",
    rating: 4.5,
    description: "Chrome extension that summarizes everything.",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Wordtune",
    slug: "wordtune",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://wordtune.com",
    rating: 4.6,
    description: "AI writing companion to improve sentences.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Fireflies.ai",
    slug: "fireflies",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://fireflies.ai",
    rating: 4.6,
    description: "Record and search your voice conversations.",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Mubert",
    slug: "mubert",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://mubert.com",
    rating: 4.4,
    description: "AI music for streamers and apps.",
    imageUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Stockimg.ai",
    slug: "stockimg",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://stockimg.ai",
    rating: 4.5,
    description: "Generate logos and stock images.",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "SlidesAI",
    slug: "slides-ai",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://slidesai.io",
    rating: 4.3,
    description: "Create professional slides in seconds.",
    imageUrl:
      "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Copy.ai",
    slug: "copy-ai",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://copy.ai",
    rating: 4.6,
    description: "Automate sales and marketing copy.",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Rytr",
    slug: "rytr",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://rytr.me",
    rating: 4.4,
    description: "Affordable AI writer for daily use.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Soundraw",
    slug: "soundraw",
    category: "Audio Tools",
    pricing: "Paid",
    websiteUrl: "https://soundraw.io",
    rating: 4.5,
    description: "Royalty free AI music generator.",
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Jasper Art",
    slug: "jasper-art",
    category: "Image Generation",
    pricing: "Paid",
    websiteUrl: "https://jasper.ai/art",
    rating: 4.4,
    description: "Create unique AI art for marketing.",
    imageUrl:
      "https://images.unsplash.com/photo-1547891319-184a668500ef?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Brainly AI",
    slug: "brainly",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://brainly.com",
    rating: 4.6,
    description: "Get homework help with AI tutor.",
    imageUrl:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
  },
  {
    name: "Quizlet AI",
    slug: "quizlet",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://quizlet.com",
    rating: 4.7,
    description: "AI-powered flashcards and study sets.",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
  },

  {
    name: "Pika",
    slug: "pika",
    category: "Video Editing",
    pricing: "Free",
    websiteUrl: "https://pika.art",
    rating: 4.7,
    description: "Text-to-video AI generator for creators.",
    imageUrl:
      "https://assets-global.website-files.com/6553f8f0f8c9f5f84e5e6f4f/65552cb47b8dcb6f5f4d4c6d_pika-cover.png",
  },
  {
    name: "Kaiber",
    slug: "kaiber",
    category: "Video Editing",
    pricing: "Paid",
    websiteUrl: "https://kaiber.ai",
    rating: 4.5,
    description: "AI-powered creative video generator.",
    imageUrl: "https://assets.kaiber.ai/static/kaiber-og-cover.jpg",
  },
  {
    name: "CapCut AI",
    slug: "capcut-ai",
    category: "Video Editing",
    pricing: "Free",
    websiteUrl: "https://capcut.com",
    rating: 4.8,
    description: "AI video editing suite with captions and effects.",
    imageUrl:
      "https://lf16-web-buz.capcut.com/obj/capcut-web-buz-us/web/ies/lvweb_os_monorepo/platformSSR/capcut_logo.png",
  },

  {
    name: "Bolt.new",
    slug: "bolt-new",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://bolt.new",
    rating: 4.8,
    description: "Generate full-stack apps instantly with AI.",
    imageUrl:
      "https://miro.medium.com/v2/resize:fit:1200/1*7bSx9r2vJ0mV9J8Ww7xW3A.png",
  },
  {
    name: "Replit AI",
    slug: "replit-ai",
    category: "Coding Tools",
    pricing: "Free",
    websiteUrl: "https://replit.com",
    rating: 4.6,
    description: "AI coding assistant inside Replit IDE.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Repl.it_logo.svg",
  },

  {
    name: "Tome",
    slug: "tome",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://tome.app",
    rating: 4.6,
    description: "AI storytelling and presentation builder.",
    imageUrl:
      "https://assets-global.website-files.com/62d6e90d743f6f6d6d5b8d84/64a3cf1c1c7dddf7b93d4d76_tome-logo.png",
  },
  {
    name: "Harpa AI",
    slug: "harpa-ai",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://harpa.ai",
    rating: 4.5,
    description: "Browser AI assistant for automation and summaries.",
    imageUrl: "https://harpa.ai/assets/images/og-image.jpg",
  },
  {
    name: "Taskade AI",
    slug: "taskade-ai",
    category: "Productivity Tools",
    pricing: "Free",
    websiteUrl: "https://taskade.com",
    rating: 4.5,
    description: "AI task manager and productivity workspace.",
    imageUrl: "https://www.taskade.com/images/social.png",
  },
  {
    name: "Writesonic",
    slug: "writesonic",
    category: "Writing Tools",
    pricing: "Free",
    websiteUrl: "https://writesonic.com",
    rating: 4.6,
    description: "AI writer for blogs, ads, and SEO content.",
    imageUrl:
      "https://uploads-ssl.webflow.com/649d7f3c4c4e0c38f7c17d88/64a68e0d4dc0e6db6c950137_writesonic-logo.png",
  },
  {
    name: "Sudowrite",
    slug: "sudowrite",
    category: "Writing Tools",
    pricing: "Paid",
    websiteUrl: "https://sudowrite.com",
    rating: 4.7,
    description: "AI writing assistant for fiction and storytelling.",
    imageUrl:
      "https://assets-global.website-files.com/63bdb9fbcf7f8e3f15c3b5e5/63be0cb7a8a7981c2cc74e07_sudowrite-logo.png",
  },
  {
    name: "Anyword",
    slug: "anyword",
    category: "Writing Tools",
    pricing: "Paid",
    websiteUrl: "https://anyword.com",
    rating: 4.5,
    description: "AI copywriting platform for marketing teams.",
    imageUrl:
      "https://assets-global.website-files.com/61b0f24d5a4f0b8452e0f4f0/61b0f67e1df6fe2f25b98e65_anyword-logo.png",
  },
  {
    name: "Murf AI",
    slug: "murf-ai",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://murf.ai",
    rating: 4.7,
    description: "AI voice generator for professional voiceovers.",
    imageUrl:
      "https://assets-global.website-files.com/62cfe2c4d88f6344f3d4d8ef/62d12e6c3c5fbe4b0e5f56f0_murf-logo.png",
  },
  {
    name: "PlayHT",
    slug: "playht",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://play.ht",
    rating: 4.6,
    description: "Realistic AI text-to-speech voice platform.",
    imageUrl: "https://play.ht/favicon.png",
  },
  {
    name: "Speechify",
    slug: "speechify",
    category: "Audio Tools",
    pricing: "Free",
    websiteUrl: "https://speechify.com",
    rating: 4.6,
    description: "AI text-to-speech reader for productivity.",
    imageUrl:
      "https://play-lh.googleusercontent.com/XlM95nM9hM7Y5Rk8h8C6c1i9jzqW0nLBKBPXn1HULICwhf66A1VpzwuNFuIBqmoeZaQ",
  },
  {
    name: "Clipdrop",
    slug: "clipdrop",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://clipdrop.co",
    rating: 4.7,
    description: "AI image editing and background removal tool.",
    imageUrl: "https://clipdrop.co/images/clipdrop-logo.png",
  },
  {
    name: "Remini",
    slug: "remini",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://remini.ai",
    rating: 4.5,
    description: "Enhance blurry and old photos with AI.",
    imageUrl:
      "https://play-lh.googleusercontent.com/Kt9vO7R2q6T6fjtcgH4p59sj2CCOrZvXSInSV+wOOyy48WaG3K7U8J0uIK4WMbe6Pf0",
  },
  {
    name: "Ideogram",
    slug: "ideogram",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://ideogram.ai",
    rating: 4.7,
    description: "AI image generation with great text rendering.",
    imageUrl: "https://ideogram.ai/assets/image/meta.png",
  },
  {
    name: "Craiyon",
    slug: "craiyon",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://craiyon.com",
    rating: 4.2,
    description: "Simple AI art generator formerly known as DALL·E Mini.",
    imageUrl: "https://www.craiyon.com/favicon.ico",
  },
  {
    name: "Remove.bg",
    slug: "remove-bg",
    category: "Image Generation",
    pricing: "Free",
    websiteUrl: "https://remove.bg",
    rating: 4.8,
    description: "Remove image backgrounds instantly with AI.",
    imageUrl: "https://www.remove.bg/apple-touch-icon.png",
  },
  {
    name: "Looka",
    slug: "looka",
    category: "Image Generation",
    pricing: "Paid",
    websiteUrl: "https://looka.com",
    rating: 4.5,
    description: "AI logo maker and branding toolkit.",
    imageUrl: "https://looka.com/s/og-image.png",
  },
  {
    name: "Durable",
    slug: "durable",
    category: "Website Builders",
    pricing: "Paid",
    websiteUrl: "https://durable.co",
    rating: 4.6,
    description: "AI website builder for businesses.",
    imageUrl:
      "https://assets-global.website-files.com/64ad81f1e0a0a6d0dfb2f7e8/64ad81f1e0a0a6d0dfb30225_durable-logo.png",
  },
  {
    name: "Framer AI",
    slug: "framer-ai",
    category: "Website Builders",
    pricing: "Free",
    websiteUrl: "https://framer.com",
    rating: 4.8,
    description: "Generate modern websites using AI prompts.",
    imageUrl:
      "https://cdn.prod.website-files.com/63c6a35ee97bea3e121bf3f4/65ba74ce20f7c87960a872cb_64631e51d10baae4dab60132_2.webp",
  },
  {
    name: "10Web AI",
    slug: "10web-ai",
    category: "Website Builders",
    pricing: "Paid",
    websiteUrl: "https://10web.io",
    rating: 4.5,
    description: "AI website builder and WordPress automation.",
    imageUrl: "https://10web.io/wp-content/uploads/2022/12/10web-logo.png",
  },
  {
    name: "Hostinger AI Website Builder",
    slug: "hostinger-ai",
    category: "Website Builders",
    pricing: "Paid",
    websiteUrl: "https://hostinger.com",
    rating: 4.4,
    description: "Build websites instantly using AI.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/Hostinger_logo_black.svg",
  },
  {
    name: "CanIRank",
    slug: "canirank",
    category: "SEO Tools",
    pricing: "Paid",
    websiteUrl: "https://canirank.com",
    rating: 4.3,
    description: "AI-powered SEO recommendations tool.",
    imageUrl:
      "https://canirank.com/wp-content/uploads/2017/03/canirank-logo.png",
  },
  {
    name: "Surfer SEO",
    slug: "surfer-seo",
    category: "SEO Tools",
    pricing: "Paid",
    websiteUrl: "https://surferseo.com",
    rating: 4.7,
    description: "AI SEO content optimization platform.",
    imageUrl:
      "https://assets-global.website-files.com/5fdd33f2f09d0d9902f0f2e5/63fce5e6e0b2b3b9cb4b6e53_surfer-logo.png",
  },
  {
    name: "Scalenut",
    slug: "scalenut",
    category: "SEO Tools",
    pricing: "Free",
    websiteUrl: "https://scalenut.com",
    rating: 4.5,
    description: "AI SEO and content marketing platform.",
    imageUrl:
      "https://assets-global.website-files.com/62aeb4a20d43d058ef5c975c/62c3e3f2fc36505f8b98cbfb_sc_logo.png",
  },
  {
    name: "Semrush AI",
    slug: "semrush-ai",
    category: "SEO Tools",
    pricing: "Paid",
    websiteUrl: "https://semrush.com",
    rating: 4.8,
    description: "AI-driven SEO and digital marketing suite.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7d/Semrush_logo.svg",
  },
  {
    name: "Zapier AI",
    slug: "zapier-ai",
    category: "Automation Tools",
    pricing: "Free",
    websiteUrl: "https://zapier.com",
    rating: 4.8,
    description: "Automate workflows using AI.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28OgecXKyOAvAX3qcQ1LwxdZsaZ1LmDjf_g&s",
  },
  {
    name: "Make AI",
    slug: "make-ai",
    category: "Automation Tools",
    pricing: "Free",
    websiteUrl: "https://make.com",
    rating: 4.6,
    description: "Visual workflow automation platform.",
    imageUrl:
      "https://images.ctfassets.net/qqlj6g8m8hoq/2dM8s8AnbJ8vF0RZJ6yJgV/1ecb0dff78eaefdd8af2fa2a343b3bf3/make-logo.png",
  },
  {
    name: "Bardeen",
    slug: "bardeen",
    category: "Automation Tools",
    pricing: "Free",
    websiteUrl: "https://bardeen.ai",
    rating: 4.5,
    description: "AI browser automation assistant.",
    imageUrl:
      "https://assets-global.website-files.com/61f3b9f3d8d5c65d8f1f3c9a/63a18d7d47f5df3f4e2a1c67_bardeen-logo.png",
  },
  {
    name: "Humata",
    slug: "humata",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://humata.ai",
    rating: 4.5,
    description: "Ask questions to PDFs using AI.",
    imageUrl: "https://humata.ai/favicon.ico",
  },
  {
    name: "Consensus",
    slug: "consensus",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://consensus.app",
    rating: 4.7,
    description: "AI search engine for research papers.",
    imageUrl: "https://consensus.app/favicon.ico",
  },
  {
    name: "Elicit",
    slug: "elicit",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://elicit.com",
    rating: 4.6,
    description: "AI research assistant for literature reviews.",
    imageUrl: "https://elicit.com/favicon.ico",
  },
  {
    name: "NotebookLM",
    slug: "notebooklm",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://notebooklm.google",
    rating: 4.8,
    description: "Google AI notebook for summarization and research.",
    imageUrl:
      "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/notebooklm.max-1000x1000.png",
  },
  {
    name: "Wolfram Alpha AI",
    slug: "wolfram-alpha-ai",
    category: "Study Tools",
    pricing: "Free",
    websiteUrl: "https://wolframalpha.com",
    rating: 4.8,
    description: "Computational AI engine for math and science.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Wolfram_Corporate_Logo.svg",
  },
];

// Seed Function
const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected!");

    // --- UPDATE THIS SECTION IN YOUR SCRIPT ---
    const toolSchema = new mongoose.Schema(
      {
        name: String,
        slug: String,
        category: String,
        pricing: String,
        websiteUrl: String,
        rating: Number,
        description: String,
        imageUrl: String, // <--- YEH LINE ADD KAREIN (ZAROORI HAI)
        features: [String],
        pros: [String],
        cons: [String],
      },
      { timestamps: true },
    ); // Timestamps bhi add kar dein taaki createdAt mil sake

    const Tool = mongoose.models.Tool || mongoose.model("Tool", toolSchema);

    console.log("Clearing old data...");
    await Tool.deleteMany({});

    console.log("Inserting new AI tools...");
    await Tool.insertMany(aiTools);

    console.log(
      `Successfully added ${aiTools.length} AI tools to the database! 🎉`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
