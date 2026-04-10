"use client";

import Link from "next/link";
import {
  Star,
  CheckCircle2,
  ArrowUpRight,
  Bookmark,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchTools } from "@/Store/slices/toolSlice";
import {
  addBookmarkLocal,
  fetchBookmarks,
  removeBookmarkLocal,
} from "@/Store/slices/userSlice";
import { toast } from "sonner";

type Tool = {
  _id?: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl?: string;
  rating: number;
  pricing: string;
};

type Props = {
  CategoryWisetools: Tool[];
  categoryName: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

export default function ToolGrid({ CategoryWisetools, categoryName }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { bookmarkIds } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchTools());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  // 🔥 Add isBookmarked flag using Redux data
  const updatedTools = CategoryWisetools.map((tool) => {
    const id = tool._id || tool.slug;

    return {
      ...tool,
      isBookmarked: tool._id ? bookmarkIds.includes(tool._id) : false,
      id,
    };
  });

  const toggleBookmark = async (e: React.MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push("/login");
      return;
    }

    const isBookmarked = bookmarkIds.includes(toolId);

    // 🔥 INSTANT UI UPDATE
    if (isBookmarked) {
      dispatch(removeBookmarkLocal(toolId));
      toast.success("Bookmark removed");
    } else {
      dispatch(addBookmarkLocal(toolId));
      toast.success("Bookmark added");
    }

    try {
      const res = await fetch("/api/bookmarks/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toolId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update bookmark");
      }
    } catch (error) {
      console.error("Bookmark error:", error);

      // 🔄 ROLLBACK
      if (isBookmarked) {
        dispatch(addBookmarkLocal(toolId));
        toast.error("Failed to remove bookmark");
      } else {
        dispatch(removeBookmarkLocal(toolId));
        toast.error("Failed to add bookmark");
      }
    }
  };

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
      {updatedTools.length > 0 ? (
        updatedTools.map((tool, toolIndex) => (
          <motion.div
            // @ts-ignore
            variants={fadeUp as any}
            key={tool.slug}
            className="h-full"
          >
            <Link
              href={`/tool/${tool.slug}`}
              className="group flex flex-col h-full bg-white border border-slate-200/80 rounded-[1.25rem] overflow-hidden hover:border-blue-200 hover:shadow-[0_15px_30px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-500 relative"
            >
              <button
                className={`absolute top-2 right-2 z-30 p-2 rounded-full transition-all shadow-md cursor-pointer ${
                  tool.isBookmarked
                    ? "bg-blue-600 text-white"
                    : "bg-white/80 text-slate-400 hover:text-blue-600"
                }`}
                onClick={(e) => toggleBookmark(e, tool.id)}
              >
                <Bookmark
                  size={14}
                  className={tool.isBookmarked ? "fill-current" : ""}
                  strokeWidth={2.5}
                />
              </button>

              {/* Image */}
              <div className="h-[100px] w-full relative overflow-hidden bg-slate-100 p-1.5">
                <div className="w-full h-full rounded-xl overflow-hidden relative border border-slate-200/50">
                  <img
                    src={
                      tool.imageUrl || getCategoryImage(categoryName, toolIndex)
                    }
                    alt={`${tool.name} banner`}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-3 pt-6 pb-4 flex flex-col flex-grow relative bg-white z-20">
                <div className="absolute -top-6 left-3 w-10 h-10 rounded-xl bg-white border-[3px] border-white shadow-md flex items-center justify-center overflow-hidden z-20">
                  <img
                    src={`https://ui-avatars.com/api/?name=${tool.name}&background=random&color=fff&size=100&bold=true`}
                    alt={tool.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex justify-between items-start gap-1 mt-1 mb-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {tool.name}
                  </h3>

                  {tool.rating >= 4.8 && (
                    <CheckCircle2
                      size={12}
                      className="text-blue-500 fill-blue-50 shrink-0"
                    />
                  )}
                </div>

                <p className="text-slate-500 text-[11px] leading-relaxed font-medium line-clamp-2 mb-3 flex-grow">
                  {tool.description}
                </p>

                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                      tool.pricing === "Free"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                        : "bg-blue-50 border-blue-100 text-blue-700"
                    }`}
                  >
                    {tool.pricing}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                    <Star size={10} className="fill-amber-400 text-amber-500" />
                    <span className="font-bold text-amber-700 text-[10px]">
                      {tool.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-blue-600">
                    Explore
                    <ArrowUpRight
                      size={16}
                      className="ml-1 opacity-100 sm:opacity-0 sm:-translate-x-2 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 sm:group-hover:translate-y-0 transition-all duration-300"
                    />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full py-14 sm:py-20 px-4 sm:px-6 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-50 border-2 border-slate-200 border-dashed flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
            <Rocket size={24} className="sm:w-7 sm:h-7 text-slate-400" />
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
  );
}
