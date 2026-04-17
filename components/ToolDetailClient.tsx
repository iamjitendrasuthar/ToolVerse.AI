"use client";

import {
  Star,
  ExternalLink,
  ChevronLeft,
  Globe,
  Zap,
  Share2,
  Layout,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRightLeft,
  TrendingUp,
  MessageSquare,
  Search,
  X,
  Plus,
  ChevronDown,
  MessageCircle,
  Copy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { FaFacebook } from "react-icons/fa";
import { toast } from "sonner";

export default function ToolDetailClient({
  tool,
  allTools = [],
}: {
  tool: any;
  allTools: any[];
}) {
  const router = useRouter();

  // State for the second AI to compare with
  const [compareWith, setCompareWith] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Search Logic for Comparison Modal
  const availableTools = useMemo(() => {
    return allTools.filter(
      (t) =>
        t.slug !== tool.slug &&
        t.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allTools, searchQuery, tool.slug]);

  const comparisonSpecs = [
    { label: "Category", key: "category", icon: <Layout size={14} /> },
    { label: "Pricing", key: "pricing", icon: <Zap size={14} /> },
    { label: "AI Type", key: "aiType", icon: <MessageSquare size={14} /> },
    {
      label: "Difficulty",
      key: "difficultyLevel",
      icon: <TrendingUp size={14} />,
    },
    {
      label: "Integrations",
      key: "integrations",
      icon: <Share2 size={14} />,
      isList: true,
    },
    {
      label: "Platforms",
      key: "platforms",
      icon: <Globe size={14} />,
      isList: true,
    },
    { label: "Rating", key: "rating", icon: <Star size={14} />, suffix: "/ 5" },
  ];
  const visibleSpecs = isExpanded
    ? comparisonSpecs
    : comparisonSpecs.slice(0, 3);

  // 1. URL aur Text Logic Fix
  const rawUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareUrl = encodeURIComponent(rawUrl);
  const shareText = encodeURIComponent(`Check out ${tool.name} 🚀`);
  return (
    <main className="min-h-screen bg-[#fafcff] text-slate-900 pb-20 selection:bg-blue-100">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 pt-24 md:pt-32">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-blue-600 transition-all shadow-sm group"
          >
            <ChevronLeft
              size={20}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <Link href="/" className="hover:text-slate-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900">{tool.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-2xl border border-white p-6 md:p-12 rounded-[2.5rem] shadow-xl shadow-blue-900/5"
            >
              {/* Tool Header */}
              <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 p-1 shadow-2xl shadow-blue-500/20">
                  <div className="w-full h-full bg-white rounded-[1.8rem] flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://ui-avatars.com/api/?name=${tool.name}&background=fff&color=2563eb&size=256&bold=true`}
                      alt={tool.name}
                      className="w-4/5 h-4/5 object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none mb-4">
                    {tool.name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full font-bold text-xs uppercase tracking-widest border border-blue-100">
                      {tool.category}
                    </span>
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs uppercase tracking-widest border border-emerald-100 flex items-center gap-1">
                      <TrendingUp size={12} /> High Demand
                    </span>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Layout size={20} className="text-blue-600" />
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Expert Review
                  </h2>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8">
                  {tool.description ||
                    `Discover how ${tool.name} is leading the market in ${tool.category}. It offers a seamless experience for both professionals and beginners.`}
                </p>

                {/* Pros & Cons Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
                    <h4 className="flex items-center gap-2 font-bold text-emerald-700 mb-4 text-lg">
                      <CheckCircle2 size={20} /> Pros
                    </h4>
                    <ul className="space-y-3 text-sm font-semibold text-emerald-800/80">
                      <li>• Outstanding performance & speed</li>
                      <li>• Intuitive user interface design</li>
                      <li>• Regular feature updates</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-rose-50/50 rounded-[2rem] border border-rose-100">
                    <h4 className="flex items-center gap-2 font-bold text-rose-700 mb-4 text-lg">
                      <XCircle size={20} /> Cons
                    </h4>
                    <ul className="space-y-3 text-sm font-semibold text-rose-800/80">
                      <li>• Limited free tier usage</li>
                      <li>• Requires internet connection</li>
                      <li>• Slight learning curve for API</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Use Cases */}
              <div className="mt-12">
                <h3 className="flex items-center gap-2 font-black text-slate-900 text-xl mb-6">
                  <Lightbulb className="text-amber-500" /> Best Use Cases
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Content Marketing",
                    "Fast Prototyping",
                    "Developer Workflow",
                    "Creative Design",
                  ].map((item) => (
                    <span
                      key={item}
                      className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <section className="space-y-8 mt-16 px-2 md:px-0">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 mb-8">
                    <ArrowRightLeft size={22} className="text-blue-600" />
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      AI Comparison
                    </h2>
                  </div>

                  {compareWith && (
                    <button
                      onClick={() => setCompareWith(null)}
                      className="group flex items-center gap-2 text-xs font-black text-rose-500 bg-rose-50/50 hover:bg-rose-100 px-5 py-2.5 rounded-2xl transition-all border border-rose-100"
                    >
                      <X
                        size={14}
                        className="group-hover:rotate-90 transition-transform"
                      />
                      Reset View
                    </button>
                  )}
                </div>

                {/* Comparison Container */}
                <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden">
                  {/* Headers: Aligned to Center */}
                  <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-stretch border-b border-slate-100 bg-slate-50/30">
                    {/* Tool A Header - Centered */}
                    <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center border-r md:border-r-0 border-slate-100">
                      <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-0.5 shadow-lg mb-3">
                        <div className="w-full h-full bg-white rounded-[0.9rem] md:rounded-[1.3rem] flex items-center justify-center font-black text-blue-600 text-xl md:text-2xl uppercase">
                          {tool.name[0]}
                        </div>
                      </div>
                      <h3 className="text-sm md:text-lg font-black text-slate-900 truncate max-w-full px-2">
                        {tool.name}
                      </h3>
                      <span className="mt-1 text-[8px] md:text-[9px] font-black uppercase text-blue-600 tracking-tighter bg-blue-100/50 px-2 py-0.5 rounded-full">
                        Current AI
                      </span>
                    </div>

                    {/* VS Badge */}
                    <div className="hidden md:flex items-center justify-center relative w-12">
                      <div className="absolute inset-y-0 w-px bg-slate-100"></div>
                      <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black italic text-xs shadow-xl z-10 border-4 border-white">
                        VS
                      </div>
                    </div>

                    {/* Tool B Header - Centered */}
                    <div className="p-6 md:p-10 flex flex-col items-center justify-center text-center">
                      <AnimatePresence mode="wait">
                        {compareWith ? (
                          <motion.div
                            key="selected"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-0.5 shadow-lg mb-3">
                              <div className="w-full h-full bg-white rounded-[0.9rem] md:rounded-[1.3rem] flex items-center justify-center font-black text-indigo-600 text-xl md:text-2xl uppercase">
                                {compareWith.name[0]}
                              </div>
                            </div>
                            <h3 className="text-sm md:text-lg font-black text-slate-900 truncate max-w-full px-2">
                              {compareWith.name}
                            </h3>
                            <button
                              onClick={() => setIsSearchOpen(true)}
                              className="mt-1 text-[8px] md:text-[9px] font-black text-indigo-600 hover:underline uppercase tracking-tighter"
                            >
                              Change AI
                            </button>
                          </motion.div>
                        ) : (
                          <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex flex-col items-center gap-3 group"
                          >
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all duration-300">
                              <Plus size={24} />
                            </div>
                            <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600">
                              Add Competitor
                            </span>
                          </button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Table Content */}
                  <div className="p-4 md:p-10">
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {visibleSpecs.map((spec, idx) => {
                          const renderValue = (data: any, isToolB = false) => {
                            if (
                              !data ||
                              (Array.isArray(data) && data.length === 0)
                            ) {
                              return (
                                <span className="text-slate-300 italic text-[10px] md:text-xs">
                                  N/A
                                </span>
                              );
                            }

                            if (spec.isList && Array.isArray(data)) {
                              return (
                                <div
                                  className={`flex flex-wrap gap-1 ${isToolB ? "justify-center md:justify-end" : "justify-center md:justify-start"}`}
                                >
                                  {data.slice(0, 2).map((item, i) => (
                                    <span
                                      key={i}
                                      className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${
                                        isToolB
                                          ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                                          : "bg-blue-50 border-blue-100 text-blue-600"
                                      }`}
                                    >
                                      {item}
                                    </span>
                                  ))}
                                  {data.length > 2 && (
                                    <span className="text-[9px] font-bold text-slate-400 self-center">
                                      +{data.length - 2}
                                    </span>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <span
                                className={`text-xs md:text-sm font-black ${isToolB ? "text-indigo-600" : "text-slate-900"}`}
                              >
                                {data}
                                {spec.suffix || ""}
                              </span>
                            );
                          };

                          return (
                            <motion.div
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              key={spec.label}
                              className="group flex flex-col md:grid md:grid-cols-3 items-center bg-white/50 border border-slate-100 md:border-none rounded-[1.5rem] md:rounded-none p-4 md:py-6 md:px-8 hover:bg-slate-50/80 transition-all md:border-b md:last:border-0 md:border-slate-50"
                            >
                              {/* 1. Current AI Value (Left on Desktop, hidden on Mobile list) */}
                              <div className="hidden md:flex flex-col items-start justify-center text-left order-2 md:order-1">
                                {renderValue(tool[spec.key])}
                              </div>

                              {/* 2. Feature Title (Center on Desktop, Top on Mobile) */}
                              <div className="flex flex-row items-center justify-center gap-3 w-full md:w-auto mb-4 md:mb-0 border-b md:border-none border-slate-50 pb-2 md:pb-0 order-1 md:order-2">
                                <div className="p-2 bg-white rounded-xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                  {spec.icon}
                                </div>
                                <span className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">
                                  {spec.label}
                                </span>
                              </div>

                              {/* 3. Values Container (Mobile view / Right side on Desktop) */}
                              <div className="grid grid-cols-2 md:grid-cols-1 items-center w-full order-3 md:order-3">
                                {/* Mobile Only: Current Value (Left side of grid) */}
                                <div className="flex flex-col items-center justify-center text-center px-2 md:hidden border-r border-slate-100">
                                  <p className="text-[8px] font-bold text-slate-300 uppercase mb-1">
                                    Current
                                  </p>
                                  {renderValue(tool[spec.key])}
                                </div>

                                {/* Compare Value (Right side of grid on Mobile, Right Aligned on Desktop) */}
                                <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right px-2 md:px-4">
                                  <p className="md:hidden text-[8px] font-bold text-slate-300 uppercase mb-1">
                                    Compare
                                  </p>
                                  {compareWith ? (
                                    renderValue(compareWith[spec.key], true)
                                  ) : (
                                    <span className="text-slate-200 italic text-xs">
                                      —
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Expand/Collapse Button */}
                    {comparisonSpecs.length > 3 && (
                      <div className="mt-8 flex justify-center">
                        <button
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                        >
                          {isExpanded
                            ? "Show Less"
                            : `Show More (${comparisonSpecs.length - 3} details)`}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-32 space-y-6"
            >
              {/* Action Card */}
              <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                      Pricing Plan
                    </p>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-md shadow-blue-200">
                      {tool.pricing}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                      User Rating
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      <Star
                        size={20}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="font-black text-slate-900 text-2xl">
                        {tool.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={tool.websiteUrl || "#"}
                  target="_blank"
                  className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] mb-4"
                >
                  Visit Official Site <ExternalLink size={18} />
                </a>

                <button
                  onClick={() => setIsShareOpen(true)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Share2 size={18} /> Share Tool
                </button>

                <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-2">
                    Editor's Note
                  </p>
                  <p className="text-xs text-blue-900/70 font-bold leading-relaxed">
                    This tool is currently trending due to its recent update
                    which improved latency by 40%.
                  </p>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20">
                <MessageSquare className="mb-4 opacity-80" size={32} />
                <h3 className="font-black text-xl mb-2">Need Help?</h3>
                <p className="text-blue-100 text-xs font-medium mb-6 leading-relaxed">
                  Confused if this is the right AI for your workflow? Join our
                  community to discuss.
                </p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                  Join Community
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- SEARCH MODAL --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black">Select Competition</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="relative mb-8">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for another AI tool..."
                  className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-4 font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {availableTools.map((t: any) => (
                  <button
                    key={t._id}
                    onClick={() => {
                      setCompareWith(t);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-4 p-5 hover:bg-blue-50 rounded-2xl transition-all group border border-transparent hover:border-blue-100 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all uppercase">
                      {t.name[0]}
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-black text-slate-900">{t.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {t.category}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-slate-300 group-hover:bg-white group-hover:text-blue-600 shadow-sm transition-all">
                      <Plus size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SHARE MODAL --- */}
      <AnimatePresence>
        {isShareOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Overlay - Soft & Light Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal - Clean White Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-sm bg-white border border-slate-100 rounded-[2.5rem] shadow-[-10px_-10px_30px_rgba(255,255,255,0.5),10px_10px_30px_rgba(70,70,70,0.1)] p-8 overflow-hidden"
            >
              {/* Subtle Light Glow Effect - Optional, but adds depth */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-50 blur-[80px] rounded-full" />

              {/* Header */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                {/* Changed text color to slate-950 (near black) */}
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                  Share
                </h3>
                <button
                  onClick={() => setIsShareOpen(false)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Social Grid */}
              <div className="grid grid-cols-3 gap-6 relative z-10">
                {[
                  {
                    name: "WhatsApp",
                    icon: <MessageCircle size={24} />,
                    color: "text-green-600", // Darker green for contrast
                    bg: "bg-green-50", // Lighter background
                    link: `https://wa.me/?text=${shareText}%20${shareUrl}`,
                  },
                  {
                    name: "Twitter",
                    icon: <BsTwitter size={24} />,
                    color: "text-sky-600",
                    bg: "bg-sky-50",
                    link: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
                  },
                  {
                    name: "Facebook",
                    icon: <FaFacebook size={24} />,
                    color: "text-blue-700",
                    bg: "bg-blue-50",
                    link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                  },
                  {
                    name: "LinkedIn",
                    icon: <LiaLinkedin size={24} />,
                    color: "text-indigo-700",
                    bg: "bg-indigo-50",
                    link: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
                  },
                  {
                    name: "Instagram",
                    icon: <BsInstagram size={24} />,
                    color: "text-pink-600",
                    bg: "bg-pink-50",
                    action: "copy",
                  },
                  {
                    name: "Copy Link",
                    icon: <Copy size={24} />,
                    color: "text-slate-600",
                    bg: "bg-slate-100",
                    action: "copy",
                  },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.link || "#"}
                    onClick={(e) => {
                      if (item.action === "copy") {
                        e.preventDefault();
                        // RAW URL copy karo taaki http:// dikhe, %3A%2F%2F nahi
                        navigator.clipboard.writeText(rawUrl);
                        toast.success(`${tool.name} link copied!`);
                      }
                    }}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div
                      className={`w-14 h-14 ${item.bg} ${item.color} flex items-center justify-center rounded-2xl border border-white/50 group-hover:border-slate-200 transition-all shadow-inner`}
                    >
                      {item.icon}
                    </div>
                    {/* Updated text color for light theme */}
                    <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 uppercase tracking-widest transition-colors">
                      {item.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Quick URL Footer */}
              <div className="mt-8 p-3 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                <span className="text-xs text-slate-500 truncate mr-4 italic">
                  {rawUrl}
                </span>
                <div className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">
                  Live Link
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}
