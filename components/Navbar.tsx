"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Sparkles,
  ArrowRight,
  Home,
  Code2,
  ImageIcon,
  Video,
  PenTool,
  ChevronDown,
  LayoutGrid,
  Music,
  Zap,
  BookOpen,
  TrendingUp,
  Palette,
  Bookmark,
  UserCircle2, // New icon for Login
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Coding", href: "/category/coding-tools", icon: Code2 },
    { name: "Images", href: "/category/image-generation", icon: ImageIcon },
    { name: "Video", href: "/category/video-editing", icon: Video },
    { name: "Writing", href: "/category/writing-tools", icon: PenTool },
  ];

  const moreCategories = [
    { name: "Audio Tools", href: "/category/audio-tools", icon: Music },
    { name: "Productivity", href: "/category/productivity-tools", icon: Zap },
    { name: "Study Tools", href: "/category/study-tools", icon: BookOpen },
    { name: "Marketing", href: "/category/marketing-tools", icon: TrendingUp },
    { name: "Design Tools", href: "/category/design-tools", icon: Palette },
  ];

  return (
    // Max width set to [1400px] to match HomeClient
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center w-full px-6 pointer-events-none">
      <nav
        className={`relative w-full max-w-[1400px] pointer-events-auto transition-all duration-500 ease-out rounded-2xl md:rounded-full border
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-2xl border-neutral-200/50 shadow-lg shadow-black/5 py-2"
              : "bg-white/70 backdrop-blur-xl border-white/60 shadow-xl shadow-black/5 py-3"
          }
        `}
      >
        <div className="px-4 md:px-6">
          <div className="flex justify-between items-center h-12">
            {/* --- LOGO --- */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                <Sparkles size={18} className="animate-pulse duration-2000" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 hidden sm:flex items-center">
                ToolsVerse
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-0.5">
                  AI
                </span>
              </span>
            </Link>

            {/* --- DESKTOP NAV --- */}
            <div className="hidden lg:flex items-center space-x-1 bg-neutral-100/50 p-1 rounded-full border border-neutral-200/50">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center gap-1.5
                      ${
                        isActive
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                      }`}
                  >
                    <link.icon
                      size={16}
                      className={isActive ? "text-blue-600" : "opacity-70"}
                    />
                    {link.name}
                  </Link>
                );
              })}

              {/* Dropdown */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-white/60">
                  <LayoutGrid size={16} className="opacity-70" />
                  More
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-56 p-2 bg-white border border-neutral-200/50 rounded-2xl shadow-xl">
                    {moreCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-neutral-50 transition-all text-neutral-600 hover:text-blue-600"
                      >
                        <cat.icon size={16} />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Search Icon */}
              <button className="p-2.5 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer">
                <Search size={20} />
              </button>

              {/* Bookmark Icon (Added) */}
              <button className="relative p-2.5 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all group cursor-pointer">
                <Bookmark size={20} />
                {/* Visual Indicator Dot */}
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform" />
              </button>

              {/* Login/User Icon (Added) */}
              <button className="hidden sm:flex items-center gap-2 p-1 pr-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all border border-neutral-200/50 cursor-pointer">
                <div className="bg-white p-1.5 rounded-full shadow-sm">
                  <UserCircle2 size={18} className="text-neutral-600" />
                </div>
                <span className="text-sm font-bold text-neutral-700">
                  Login
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 bg-neutral-100 text-neutral-600 rounded-xl active:scale-95 transition-all cursor-pointer"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE NAV (Compact & Fixed Overflow) --- */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[75px] z-50 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible"
          }`}
        >
          {/* Container: Margin aur Padding minimal rakhi hai space bachane ke liye */}
          <div className="bg-white border border-neutral-200 rounded-3xl shadow-xl overflow-y-auto max-h-[80vh] no-scrollbar">
            <div className="flex flex-col">
              {/* 1. Search Bar (Slim Version) */}
              <div className="px-4 py-3 border-b border-neutral-50 sticky top-0 bg-white z-10">
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    type="text"
                    placeholder="Search AI..."
                    className="w-full bg-transparent border-none py-1.5 pl-7 pr-3 text-sm font-medium focus:ring-0 placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* 2. Navigation List (Compressed Padding) */}
              <div className="py-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-5 py-3 active:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-50 text-neutral-500">
                        <link.icon size={16} strokeWidth={2} />
                      </div>
                      <span className="text-[14px] font-semibold text-neutral-800">
                        {link.name}
                      </span>
                    </div>
                    <ArrowRight size={12} className="text-neutral-300" />
                  </Link>
                ))}
              </div>

              {/* 3. Horizontal Categories (Minimal Height) */}
              <div className="bg-neutral-50/50 py-3 border-y border-neutral-100">
                <div className="flex overflow-x-auto gap-2 px-4 no-scrollbar">
                  {moreCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      className="flex-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm active:scale-95 transition-all"
                    >
                      <cat.icon size={12} className="text-blue-500" />
                      <span className="text-[12px] font-bold text-neutral-700 whitespace-nowrap">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 4. Actions (Compact Row) */}
              <div className="px-4 py-4 bg-white">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/bookmarks"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-100 text-neutral-900 font-bold active:bg-neutral-200 transition-all text-xs"
                  >
                    <Bookmark size={14} />
                    Saved
                  </Link>

                  <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 text-white font-bold active:scale-[0.98] transition-all text-xs shadow-md">
                    <UserCircle2 size={14} />
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
