"use client";

import Link from "next/link";
import {
  Search,
  ArrowRight,
  Star,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  PlayCircle,
  Image as ImageIcon,
  Code,
  PenTool,
  Command,
  Bookmark,
  Zap,
  Rocket,
  Globe,
  Layers,
  Cpu,
  Award,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomeClient({ categoryData }: { categoryData: any[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth Parallax effects for the Hero
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yHeroImages = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Crisp Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  // Premium abstract images for tools
  const getCategoryImage = (categoryName: string, index: number) => {
    const images: any = {
      "Coding Tools": [
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      ],
      "Image Generation": [
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop",
      ],
      "Video Editing": [
        "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      ],
      "Writing Tools": [
        "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop",
      ],
    };
    return images[categoryName]?.[index % 3] || images["Coding Tools"][0];
  };
  const allTools = categoryData.flatMap((category) => category.tools);

  const trendingToolNames = [
    "ChatGPT",
    "Gemini", 
    "Grok",
    "Perplexity",
    "DeepSeek",
    "Claude 3.5 Sonnet",
  ];

  const topTrendingCategory = {
    name: "Top Trending",
    slug: "top-trending",
    tools: trendingToolNames
      .map((name) => allTools.find((tool) => tool.name === name))
      .filter(Boolean),
  };
  const filteredCategories = [
    topTrendingCategory,
    ...categoryData.filter((category) =>
      [
        "Coding Tools",
        "Writing Tools",
        "Image Generation",
        "Video Editing",
      ].includes(category.name),
    ),
  ];
  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#fafcff] text-slate-900 overflow-hidden selection:bg-blue-200 selection:text-blue-900 pb-20"
    >
      {/* --- REFINED AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle grid fading at the bottom */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Smooth CSS glowing orbs */}
        <div
          className="absolute top-[-10%] left-[-5%] w-[45%] h-[50%] rounded-full bg-blue-400/20 blur-[140px] animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-[5%] right-[-5%] w-[40%] h-[50%] rounded-full bg-indigo-400/15 blur-[140px] animate-pulse"
          style={{ animationDuration: "10s" }}
        />
      </div>

      {/* --- HERO SECTION --- */}
      <motion.section
        style={{ opacity: opacityHero }}
        className="relative pt-32 md:pt-48 pb-20 px-6 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-screen lg:min-h-[95vh] z-10"
      >
        {/* Left Column: Content */}
        <motion.div
          style={{ y: yHeroText }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-6 xl:col-span-6 will-change-transform"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/50 backdrop-blur-md border border-blue-100 shadow-sm mb-8 group hover:bg-blue-100/50 transition-all cursor-default"
          >
            <div className="bg-blue-600 p-1 rounded-full group-hover:rotate-12 transition-transform">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="text-[11px] md:text-xs font-bold text-blue-700 uppercase tracking-widest">
              The Future of Workflow
            </span>
          </motion.div>

          {/* Main Heading with Gradient Text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1] text-slate-900"
          >
            Accelerate with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
              AI Precision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed font-medium"
          >
            The world's most comprehensive directory of verified AI tools.
            Filter, compare, and deploy the tech that puts you ahead.
          </motion.p>

          {/* Modern Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-2xl relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[30px] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>

            <div className="relative flex items-center bg-white border border-slate-200/80 rounded-2xl p-1.5 shadow-xl transition-all duration-300 focus-within:border-blue-400 focus-within:shadow-blue-100/50">
              <div className="flex items-center flex-1 px-4 gap-3">
                <Search
                  className="text-slate-400 group-focus-within:text-blue-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="What do you want to build today?"
                  className="w-full py-3 bg-transparent text-slate-800 placeholder:text-slate-400 outline-none text-base md:text-lg font-medium"
                />
              </div>

              <button className="bg-slate-900 hover:bg-blue-600 text-white px-6 md:px-8 py-3 rounded-[14px] font-bold text-sm md:text-base transition-all active:scale-95 flex items-center gap-2">
                Find Tools
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick Tags */}
            <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar pb-2">
              {["Video Gen", "Coding", "Writing"].map((tag) => (
                <button
                  key={tag}
                  className="whitespace-nowrap text-[12px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Visualizer */}
        <motion.div
          style={{ y: yHeroImages }}
          className="relative z-20 flex lg:col-span-6 xl:col-span-6 h-full items-center justify-center min-h-[450px] w-full will-change-transform"
        >
          <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/30 rounded-full blur-[100px] -z-10 animate-pulse" />

            {/* The Floating UI Card */}
            <motion.div
              animate={{
                y: [-15, 15, -15],
                rotate: [-1, 1, -1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-[85%] bg-white rounded-[40px] p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden"
            >
              <div className="w-full h-full rounded-[30px] bg-slate-50 overflow-hidden relative border border-slate-100">
                {/* Replace with your specific project screenshot or high-res abstract */}
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt="AI Visual"
                />
                {/* Glass Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
            </motion.div>

            {/* Floating Widget 1: Status */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 md:-right-8 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/50 z-30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Cpu size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    System Status
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    AI Engines Live
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Widget 2: Rating */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-2 md:-left-12 bg-slate-900 text-white p-6 rounded-[32px] shadow-2xl z-30 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-slate-900"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="user"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={10}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-slate-400">
                  10k+ Daily Users
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* --- DYNAMIC CATEGORY DIRECTORY --- */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto space-y-20 sm:space-y-24 lg:space-y-32 relative z-20 py-24 sm:py-20 lg:py-24">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-8 sm:gap-10 lg:gap-12 relative"
          >
            {/* Category Header */}
            <motion.div
              // @ts-ignore
              variants={fadeUp as any}
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between relative"
            >
              <div className="w-full">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className="shrink-0 p-2.5 sm:p-3.5 bg-white border border-slate-200 rounded-2xl text-blue-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    {category.name.includes("Coding") ? (
                      <Code
                        size={22}
                        className="sm:w-7 sm:h-7"
                        strokeWidth={2.5}
                      />
                    ) : category.name.includes("Video") ? (
                      <PlayCircle
                        size={22}
                        className="sm:w-7 sm:h-7"
                        strokeWidth={2.5}
                      />
                    ) : category.name.includes("Image") ? (
                      <ImageIcon
                        size={22}
                        className="sm:w-7 sm:h-7"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <PenTool
                        size={22}
                        className="sm:w-7 sm:h-7"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-900 leading-tight">
                    {category.name}
                  </h2>
                </div>

                <p className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl ml-0 sm:ml-[4.5rem] max-w-xl font-medium leading-relaxed">
                  Hand-picked tools to supercharge your{" "}
                  {category.name.toLowerCase()} workflows.
                </p>
              </div>

              {category.name !== "Top Trending" && (
                <Link
                  href={`/category/${category.slug}`}
                  className="group inline-flex items-center justify-center w-full sm:w-fit md:w-auto bg-white border border-slate-200 px-5 sm:px-6 py-3 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  View Directory
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1.5 transition-transform"
                  />
                </Link>
              )}
            </motion.div>

            {/* Tool Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {category.tools.length > 0 ? (
                category.tools.map((tool: any, toolIndex: number) => (
                  <motion.div
                    // @ts-ignore
                    variants={fadeUp as any}
                    key={tool.slug}
                    className="h-full"
                  >
                    <Link
                      href={`/tool/${tool.slug}`}
                      className="group flex flex-col h-full bg-white border border-slate-200/80 rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(37,99,235,0.06)] hover:-translate-y-1 sm:hover:-translate-y-1.5 transition-all duration-500 relative"
                    >
                      {/* Floating Bookmark */}
                      <button
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-slate-400 hover:text-blue-600 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-sm sm:transform sm:translate-y-2 sm:group-hover:translate-y-0"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Bookmark
                          size={16}
                          className="sm:w-[18px] sm:h-[18px]"
                          strokeWidth={2.5}
                        />
                      </button>

                      {/* Top Banner */}
                      <div className="h-[160px] sm:h-[180px] w-full relative overflow-hidden bg-slate-100 p-2">
                        <div className="w-full h-full rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden relative border border-slate-200/50">
                          <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
                          <img
                            src={
                              tool.imageUrl ||
                              getCategoryImage(category.name, toolIndex)
                            }
                            alt={`${tool.name} banner`}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-4 sm:px-6 pt-8 sm:pt-10 pb-5 sm:pb-6 flex flex-col flex-grow relative bg-white z-20">
                        {/* Avatar */}
                        <div className="absolute -top-8 sm:-top-10 left-4 sm:left-6 w-[3.75rem] h-[3.75rem] sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl bg-white border-[4px] border-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center overflow-hidden z-20 group-hover:-translate-y-1 transition-transform duration-300">
                          <img
                            src={`https://ui-avatars.com/api/?name=${tool.name}&background=random&color=fff&size=150&bold=true`}
                            alt={tool.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex justify-between items-start gap-3 mt-2 mb-3">
                          <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {tool.name}
                          </h3>

                          {tool.rating >= 4.8 && (
                            <div
                              className="shrink-0 bg-blue-50 text-blue-500 p-1.5 rounded-full"
                              title="Top Rated"
                            >
                              <CheckCircle2
                                size={14}
                                className="sm:w-4 sm:h-4 fill-blue-100"
                              />
                            </div>
                          )}
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3 mb-5 sm:mb-6 flex-grow">
                          {tool.description}
                        </p>

                        {/* Tags */}
                        <div className="flex items-center gap-2 mb-5 sm:mb-6 flex-wrap">
                          <span
                            className={`text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl border ${
                              tool.pricing === "Free"
                                ? "bg-emerald-50 border-emerald-100/50 text-emerald-700"
                                : tool.pricing === "Freemium"
                                  ? "bg-blue-50 border-blue-100/50 text-blue-700"
                                  : "bg-purple-50 border-purple-100/50 text-purple-700"
                            }`}
                          >
                            {tool.pricing}
                          </span>

                          <span className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/50 text-slate-500 line-clamp-1">
                            {tool.category}
                          </span>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-slate-100 mt-auto gap-3">
                          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-amber-100/50 shrink-0">
                            <Star
                              size={13}
                              className="sm:w-[14px] sm:h-[14px] fill-amber-400 text-amber-500"
                            />
                            <span className="font-bold text-amber-700 text-xs sm:text-sm">
                              {tool.rating}
                            </span>
                          </div>

                          <div className="flex items-center text-xs sm:text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                            Explore
                            <ArrowUpRight
                              size={16}
                              className="ml-1 opacity-100 sm:opacity-0 sm:-translate-x-2 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 sm:group-hover:translate-y-0 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-14 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-50 border-2 border-slate-200 border-dashed flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                    <Rocket
                      size={24}
                      className="sm:w-7 sm:h-7 text-slate-400"
                    />
                  </div>

                  <p className="text-slate-900 font-bold text-lg sm:text-xl mb-1">
                    Curating New Tools
                  </p>

                  <p className="text-slate-500 text-sm font-medium max-w-md">
                    Our system is gathering the best AI tools for this category.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* --- HIGH CONTRAST BOTTOM CTA (DARK THEME) --- */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 sm:mt-24 lg:mt-32 py-16 sm:py-24 lg:py-32 mx-4 sm:mx-6 lg:mx-8 xl:mx-auto max-w-[1400px] relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] border border-slate-800 bg-slate-950 text-white shadow-2xl"
      >
        {/* Deep Animated Background inside CTA */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-indigo-900/20" />
        <div className="absolute top-[-40%] sm:top-[-50%] right-[-20%] sm:right-[-10%] w-[100%] sm:w-[80%] h-[140%] sm:h-[150%] bg-blue-500/10 blur-[100px] sm:blur-[120px] rounded-full rotate-45 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-6 text-center flex flex-col items-center">
          <div className="bg-slate-900 border border-slate-800 w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mb-6 sm:mb-8 shadow-inner">
            <Zap
              size={26}
              className="sm:w-8 sm:h-8 text-amber-400 fill-amber-400/20"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-5 sm:mb-6 tracking-tight sm:tracking-tighter leading-[1.1] text-white drop-shadow-md">
            Build your AI stack <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            faster than ever.
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-10 lg:mb-12 font-medium max-w-xl leading-relaxed">
            Join the directory trusted by the world's best creators. Submit your
            AI product today and reach thousands of users.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto min-w-[220px] bg-white text-slate-900 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
              Submit Your Tool
            </button>

            <button className="w-full sm:w-auto min-w-[220px] bg-slate-800/50 backdrop-blur-md text-white border border-slate-700 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold hover:bg-slate-800 transition-all duration-300">
              Explore Network
            </button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
