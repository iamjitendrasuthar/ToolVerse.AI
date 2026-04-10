"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  Search,
  ChevronRight,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Trash2,
  Library,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ToolType {
  _id: string; // MongoDB ID mandatory hai indexing ke liye
  name: string;
  slug: string;
  description?: string;
  pricing?: string;
  rating?: number;
  category?: string;
  imageUrl?: string;
}

export default function BookmarksPage() {
  const [bookmarkedTools, setBookmarkedTools] = useState<ToolType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchBookmarks = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (!res.ok) {
          throw new Error("Failed to fetch bookmarks");
        }

        const data = await res.json();

        setBookmarkedTools(data.bookmarks || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  // 2. Remove bookmark from Database (Toggle API call)
  const removeBookmark = async (e: React.MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic Update: UI se pehle hi hata do
    const previousBookmarks = [...bookmarkedTools];
    setBookmarkedTools((prev) => prev.filter((t) => t._id !== toolId));

    try {
      const res = await fetch("/api/bookmarks/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId }),
      });

      if (!res.ok) throw new Error("Failed to sync with database");
    } catch (error) {
      // Agar API fail ho jaye toh wapas purana state le aao
      setBookmarkedTools(previousBookmarks);
      console.error("Error removing bookmark:", error);
    }
  };

  // 3. Clear All Bookmarks (Optional: Requires a bulk delete API)
  const clearAllBookmarks = async () => {
    if (
      confirm(
        "Are you sure you want to remove all saved tools from your account?",
      )
    ) {
      const previous = [...bookmarkedTools];
      setBookmarkedTools([]);

      try {
        // Aap ek dedicated endpoint bana sakte hain clear karne ke liye
        const res = await fetch("/api/bookmarks/clear", { method: "DELETE" });
        if (!res.ok) throw new Error();
      } catch (error) {
        setBookmarkedTools(previous);
        alert("Could not clear bookmarks. Try again.");
      }
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#fafcff] text-slate-900 overflow-hidden selection:bg-blue-200 selection:text-blue-900 pb-24">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-200/20 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-indigo-200/20 blur-[70px] md:blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 pt-30 md:pt-32">
        <nav className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-400 mb-6 md:mb-8 overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-900">Saved Tools</span>
        </nav>

        <header className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
              <Library size={14} /> Your Library
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 text-slate-900 leading-[1.1]">
              Saved{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Bookmarks
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              Your personal collection from our database. Access them anytime
              across devices.
            </p>
          </motion.div>

          {!loading && bookmarkedTools.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={clearAllBookmarks}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-bold text-sm transition-all shadow-sm cursor-pointer"
            >
              <Trash2 size={16} /> Clear All
            </motion.button>
          )}
        </header>

        <section className="relative z-20">
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p className="font-bold">Syncing with your account...</p>
              </div>
            ) : bookmarkedTools.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-24 md:py-32 bg-white/50 backdrop-blur-xl rounded-[2rem] border-2 border-dashed border-slate-200/80"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                  <Bookmark size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  No saved tools yet
                </h3>
                <p className="text-slate-500 font-medium max-w-sm mb-8">
                  Your account's library is empty. Bookmark any tool to see it
                  here.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg"
                >
                  <Search size={18} /> Discover AI Tools
                </Link>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5"
              >
                {bookmarkedTools.map((tool, index) => (
                  <motion.div
                    key={tool._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Link
                      href={`/tool/${tool.slug}`}
                      className="group flex flex-col h-full bg-white border border-slate-200/80 rounded-[1.25rem] overflow-hidden hover:border-blue-300 hover:shadow-[0_15px_30px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-300 relative"
                    >
                      {/* Database Remove Button */}
                      <button
                        className="absolute top-2 right-2 z-30 p-2 bg-blue-600 rounded-full text-white hover:bg-red-500 hover:scale-110 transition-all shadow-md cursor-pointer group/btn"
                        onClick={(e) => removeBookmark(e, tool._id)}
                      >
                        <Bookmark
                          size={14}
                          className="fill-current group-hover/btn:hidden"
                        />
                        <Trash2
                          size={14}
                          className="hidden group-hover/btn:block"
                        />
                      </button>

                      <div className="h-[110px] w-full relative overflow-hidden bg-slate-100 p-1.5">
                        <div className="w-full h-full rounded-xl overflow-hidden relative border border-slate-200/50">
                          <img
                            src={
                              tool.imageUrl ||
                              `https://ui-avatars.com/api/?name=${tool.name}&background=random`
                            }
                            alt={tool.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>

                      <div className="px-3 md:px-4 pt-6 pb-4 flex flex-col flex-grow relative bg-white z-20">
                        <div className="absolute -top-6 left-3 md:left-4 w-11 h-11 rounded-xl bg-white border-[3px] border-white shadow-md overflow-hidden">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&bold=true`}
                            alt={tool.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-start gap-1 mt-1 mb-1.5">
                          <h3 className="text-[15px] font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {tool.name}
                          </h3>
                          {tool.rating && tool.rating >= 4.8 && (
                            <CheckCircle2
                              size={14}
                              className="text-blue-500 fill-blue-50"
                            />
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px] leading-relaxed font-medium line-clamp-2 mb-4 flex-grow">
                          {tool.description || "Detailed AI tool overview..."}
                        </p>
                        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                          <span
                            className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md border ${tool.pricing === "Free" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-blue-50 border-blue-100 text-blue-700"}`}
                          >
                            {tool.pricing || "Freemium"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                            <Star
                              size={12}
                              className="fill-amber-400 text-amber-500"
                            />
                            <span className="font-bold text-amber-700 text-[11px]">
                              {tool.rating || "4.5"}
                            </span>
                          </div>
                          <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                            Explore <ArrowUpRight size={14} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
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
