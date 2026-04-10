"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Star,
  ArrowUpRight,
  Search,
  Zap,
  ChevronRight,
  ChevronDown,
  Check,
  ArrowDownWideNarrow,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ToolGrid from "./ToolGrid";

function formatUseCaseName(slug: string) {
  if (!slug) return "";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface ToolType {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  pricing?: string;
  rating?: number;
  views?: number;
  createdAt?: string;
  category?: string; // Kept category to show on the card tag
  useCases?: string[]; // Added useCases array
  imageUrl?: string;
}

export default function UseCaseClient({
  initialTools = [],
  slug,
}: {
  initialTools: ToolType[];
  slug: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const useCaseName = formatUseCaseName(slug);

  const sortOptions = ["Popularity", "Newest", "Highest Rated"];

  const filteredAndSortedTools = useMemo(() => {
    const result = [...initialTools].filter((tool) => {
      if (!tool) return false;

      const matchesSearch =
        tool.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Free" && tool.pricing === "Free") ||
        (activeFilter === "Paid" &&
          (tool.pricing === "Paid" || tool.pricing === "Premium")) ||
        (activeFilter === "Highest Rated" && (tool.rating || 0) >= 4.8);

      return matchesSearch && matchesFilter;
    });

    if (sortBy === "Highest Rated") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "Newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
    } else {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return result;
  }, [searchQuery, activeFilter, sortBy, initialTools]);

  return (
    <main className="min-h-screen bg-[#fafcff] text-slate-900 overflow-hidden selection:bg-blue-200 selection:text-blue-900 pb-20">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-200/20 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-200/20 blur-[70px] md:blur-[100px] rounded-full" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 pt-30 md:pt-32">
        {/* Breadcrumbs - Updated for Use Cases */}
        <nav className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400 mb-6 md:mb-8 overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-blue-600">Use Cases</span>
          <ChevronRight size={12} />
          <span className="text-slate-900">{useCaseName}</span>
        </nav>

        {/* Header - Updated Text */}
        <header className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8"
          >
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 text-slate-900 leading-[1.1]">
                Best AI Tools For
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}
                  {useCaseName}
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                Explore our curated list of the top-performing AI tools for{" "}
                {useCaseName.toLowerCase()}.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-white p-1.5 md:p-2 rounded-2xl border border-slate-200 shadow-sm w-fit">
              <div className="bg-blue-600 p-1.5 md:p-2 rounded-xl text-white">
                <Zap size={18} className="fill-current" />
              </div>

              <div className="pr-3 md:pr-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Tools
                </p>
                <p className="text-lg md:text-xl font-black text-slate-900">
                  {filteredAndSortedTools.length}
                </p>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Search + Filter */}
        <section className="sticky top-[70px] md:top-24 z-30 mb-8 md:mb-12">
          <div className="bg-white/80 backdrop-blur-2xl border border-white/50 shadow-xl shadow-blue-900/5 rounded-2xl md:rounded-[2rem] p-2 md:p-3 flex flex-col lg:flex-row items-center gap-3 md:gap-4">
            {/* Search */}
            <div className="relative w-full lg:max-w-md group">
              <Search
                className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
                size={18}
              />

              <input
                type="text"
                placeholder={`Search ${useCaseName} tools...`}
                className="w-full bg-slate-100/50 border-none rounded-xl md:rounded-2xl py-3 md:py-4 pl-11 md:pl-14 pr-4 focus:ring-2 focus:ring-blue-500/20 text-sm md:text-base text-slate-800 font-medium transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 p-1 bg-slate-100/50 rounded-xl md:rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
              {["All", "Free", "Paid", "Highest Rated"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`cursor-pointer px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative w-full lg:w-auto lg:ml-auto">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full lg:w-auto flex items-center justify-between gap-4 md:gap-10 px-4 md:px-5 py-2.5 md:py-3 bg-white border border-slate-200 rounded-xl md:rounded-2xl group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowDownWideNarrow size={14} />
                  </div>

                  <div className="flex flex-col items-start leading-none text-left">
                    <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 md:mb-1">
                      Sort By
                    </span>
                    <span className="text-xs md:text-sm font-bold text-slate-900">
                      {sortBy}
                    </span>
                  </div>
                </div>

                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-300 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10 lg:hidden cursor-pointer"
                      onClick={() => setIsSortOpen(false)}
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-full lg:w-56 bg-white border border-slate-200 rounded-xl md:rounded-2xl shadow-2xl p-2 z-20"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          className={`cursor-pointer w-full flex items-center justify-between px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition-all ${
                            sortBy === option
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-600"
                          }`}
                        >
                          {option}
                          {sortBy === option && <Check size={14} />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- DYNAMIC TOOLS DIRECTORY --- */}
        <ToolGrid
          CategoryWisetools={filteredAndSortedTools as any}
          categoryName={useCaseName}
        />
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
