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
  Bookmark,
  Zap,
  Rocket,
  Cpu,
  LayoutGrid,
  X,
  Trash2,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchTools } from "@/Store/slices/toolSlice";
import { fetchBookmarks } from "@/Store/slices/userSlice";
import ToolGrid from "./ToolGrid";

export default function HomeClient({ categoryData }: { categoryData: any[] }) {
  const containerRef = useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbData, setDbData] = useState({ tools: [], categories: [] });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth Parallax effects for the Hero
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yHeroImages = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const dispatch = useAppDispatch();

  const { tools } = useAppSelector((state) => state.tools);

  useEffect(() => {
    dispatch(fetchTools());
  }, [dispatch]);
  const { bookmarkIds, user } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);
  // Crisp Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  // --- FETCH SEARCH DATA ---
  useEffect(() => {
    if (isSearchOpen) {
      fetch("/api/search-data")
        .then((res) => res.json())
        .then((data) => setDbData(data))
        .catch((err) => console.error("Search fetch error:", err));
    }
  }, [isSearchOpen]);

  // --- FILTER RESULTS ---
  const results = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return { tools: [], categories: [] };

    return {
      tools: dbData.tools
        .filter(
          (t: any) =>
            t.name.toLowerCase().includes(query) ||
            t.category?.toLowerCase().includes(query),
        )
        .slice(0, 6),
      categories: dbData.categories
        .filter((c: any) => c.name.toLowerCase().includes(query))
        .slice(0, 4),
    };
  }, [searchQuery, dbData]);
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
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
      {/* --- SEARCH MODAL (INTEGRATED) --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {" "}
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery("");
            }}
          />
          {/* Modal Card */}
          <div className="relative z-[10000] w-full max-w-3xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200">
            {" "}
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <Search className="text-blue-600" size={20} />
              <input
                autoFocus
                placeholder="Search 1000+ AI tools..."
                className="flex-1 bg-transparent text-lg font-semibold text-slate-800 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto px-5 py-4 custom-scrollbar">
              {!searchQuery ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles size={28} />
                  </div>
                  <h3 className="font-bold text-slate-800">
                    Ready to Explore?
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xs mt-1">
                    Search for any AI category like "Video", "Coding", or
                    "Design".
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Results for Categories */}
                  {results.categories.length > 0 && (
                    <section>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
                        Categories
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {results.categories.map((cat: any) => (
                          <Link
                            key={cat.slug}
                            href={cat.href}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-100"
                          >
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <LayoutGrid size={14} className="text-blue-600" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                              {cat.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Results for Tools */}
                  {results.tools.length > 0 && (
                    <section>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-1">
                        Top Tools
                      </h3>
                      <div className="space-y-2">
                        {results.tools.map((tool: any) => (
                          <Link
                            key={tool.slug}
                            href={`/tool/${tool.slug}`}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                                <img
                                  src={
                                    tool.imageUrl ||
                                    `https://ui-avatars.com/api/?name=${tool.name}`
                                  }
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800 text-sm">
                                  {tool.name}
                                </h4>
                                <p className="text-xs text-slate-500">
                                  {tool.category}
                                </p>
                              </div>
                            </div>
                            <ArrowRight
                              size={16}
                              className="text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1"
                            />
                          </Link>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* No Results */}
                  {results.tools.length === 0 &&
                    results.categories.length === 0 && (
                      <div className="py-12 text-center text-slate-400 font-medium">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                ToolsVerse AI Index
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                Live Search
              </div>
            </div>
          </div>
        </div>
      )}
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

            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[30px] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>

            <div
              onClick={() => setIsSearchOpen(true)}
              className="relative flex items-center bg-white border border-slate-200/80 rounded-2xl p-1.5 shadow-xl cursor-pointer hover:border-blue-400 transition-all"
            >
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

              <button className="bg-slate-900 hover:bg-blue-600 text-white px-6 md:px-8 py-3 rounded-[14px] font-bold text-sm md:text-base transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
                Search Tools
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick Tags */}
            <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar pb-2">
              {["Video Gen", "Coding", "Writing"].map((tag) => (
                <button
                  key={tag}
                  className="whitespace-nowrap text-[12px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer"
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
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto space-y-16 sm:space-y-20 relative z-20 py-12 sm:py-16">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-6 sm:gap-8 relative"
          >
            {/* Category Header */}
            <motion.div
              // @ts-ignore
              variants={fadeUp as any}
              className="flex flex-col gap-1 sm:gap-2 relative mb-1 sm:mb-2"
            >
              {/* Top Row: Icon + Title AND Button */}
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icon Box */}
                  <div className="shrink-0 p-2 sm:p-2.5 bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm">
                    {category.name.includes("Coding") ? (
                      <Code
                        size={18}
                        className="sm:w-5 sm:h-5"
                        strokeWidth={2.5}
                      />
                    ) : category.name.includes("Video") ? (
                      <PlayCircle
                        size={18}
                        className="sm:w-5 sm:h-5"
                        strokeWidth={2.5}
                      />
                    ) : category.name.includes("Image") ? (
                      <ImageIcon
                        size={18}
                        className="sm:w-5 sm:h-5"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <PenTool
                        size={18}
                        className="sm:w-5 sm:h-5"
                        strokeWidth={2.5}
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 truncate">
                    {category.name}
                  </h2>
                </div>

                {/* Button: Always on the Right */}
                {category.name !== "Top Trending" && (
                  <Link
                    href={`/category/${category.slug}`}
                    className="group shrink-0 inline-flex items-center justify-center bg-white border border-slate-200 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all duration-300 whitespace-nowrap"
                  >
                    <span className="hidden xs:inline">View Directory</span>
                    <span className="xs:hidden">View All</span>
                    <ArrowRight
                      size={14}
                      className="ml-1 sm:ml-1.5 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Tool Cards Grid - Updated for 2 per row (mobile) and 6 per row (desktop) */}
            <ToolGrid
              tools={category.tools}
              categoryName={category.name}
              fadeUp={fadeUp}
            />
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
            <button className="w-full sm:w-auto min-w-[220px] bg-slate-800/50 backdrop-blur-md text-white border border-slate-700 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold hover:bg-slate-800 transition-all duration-300 cursor-pointer">
              Explore Network
            </button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
