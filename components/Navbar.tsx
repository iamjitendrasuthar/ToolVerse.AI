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
  UserCircle2,
  Mic2,
  MessageSquare,
  Globe,
  Share2,
  Bot,
  BarChart3,
  Mail,
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

  // Primary links shown directly on Navbar
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Coding", href: "/category/coding-tools", icon: Code2 },
    { name: "Images", href: "/category/image-generation", icon: ImageIcon },
    { name: "Video", href: "/category/video-editing", icon: Video },
    { name: "Writing", href: "/category/writing-tools", icon: PenTool },
  ];

  // All other categories for "More" and Mobile Menu
  const moreCategories = [
    { name: "Audio & Voice", href: "/category/audio-tools", icon: Mic2 },
    { name: "Productivity", href: "/category/productivity-tools", icon: Zap },
    { name: "Education", href: "/category/study-tools", icon: BookOpen },
    { name: "Marketing", href: "/category/marketing-tools", icon: TrendingUp },
    { name: "Design & UI", href: "/category/design-tools", icon: Palette },
    { name: "Chatbots", href: "/category/chatbots", icon: MessageSquare },
    { name: "SEO Tools", href: "/category/seo", icon: Globe },
    { name: "Social Media", href: "/category/social-media", icon: Share2 },
    {
      name: "Data & Analysis",
      href: "/category/data-analysis",
      icon: BarChart3,
    },
    { name: "Email AI", href: "/category/email-ai", icon: Mail },
    { name: "Automation", href: "/category/automation", icon: Bot },
  ];

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center w-full px-6 pointer-events-none">
      <nav
        className={`relative w-full max-w-[1400px] pointer-events-auto transition-all duration-500 ease-out rounded-2xl md:rounded-full border
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-2xl border-neutral-200/50 shadow-lg py-2"
              : "bg-white/70 backdrop-blur-xl border-white/60 shadow-xl py-3"
          }
        `}
      >
        <div className="px-4 md:px-6">
          <div className="flex justify-between items-center h-12">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-2 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-all duration-300">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-neutral-900 hidden sm:flex items-center">
                ToolsVerse
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-0.5">
                  AI
                </span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center space-x-1 bg-neutral-100/50 p-1 rounded-full border border-neutral-200/50">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center gap-1.5
                      ${isActive ? "bg-white text-blue-600 shadow-sm" : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"}`}
                  >
                    <link.icon
                      size={16}
                      className={isActive ? "text-blue-600" : "opacity-70"}
                    />
                    {link.name}
                  </Link>
                );
              })}

              {/* Enhanced Grid Dropdown for All Categories */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-white/60 cursor-pointer">
                  <LayoutGrid size={16} className="opacity-70" />
                  More
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                </button>

                {/* Mega Dropdown style (Grid Layout) */}
                <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-[450px] p-4 bg-white border border-neutral-200/60 rounded-3xl shadow-2xl grid grid-cols-2 gap-1">
                    <p className="col-span-2 text-[10px] uppercase tracking-widest text-neutral-400 font-bold px-3 mb-2">
                      Explore All Categories
                    </p>
                    {moreCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-blue-50 transition-all text-neutral-600 hover:text-blue-600 group/item"
                      >
                        <div className="p-1.5 rounded-lg bg-neutral-50 group-hover/item:bg-white transition-colors">
                          <cat.icon
                            size={16}
                            className="text-neutral-500 group-hover/item:text-blue-600"
                          />
                        </div>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <button className="p-2.5 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer">
                <Search size={20} />
              </button>

              <button className="relative p-2.5 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all group cursor-pointer">
                <Bookmark size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform" />
              </button>

              <button className="hidden sm:flex items-center gap-2 p-1 pr-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all border border-neutral-200/50 cursor-pointer">
                <div className="bg-white p-1.5 rounded-full shadow-sm">
                  <UserCircle2 size={18} className="text-neutral-600" />
                </div>
                <span className="text-sm font-bold text-neutral-700">
                  Login
                </span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 bg-neutral-100 text-neutral-600 rounded-xl active:scale-95 transition-all cursor-pointer"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE NAV (Fixed & Optimized) --- */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full mt-3 z-50 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-4 invisible pointer-events-none"
          }`}
        >
          <div className="bg-white border border-neutral-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
            {/* 2. Scrollable Content Area */}
            <div className="overflow-y-auto custom-scrollbar overflow-x-hidden">
              {/* Primary Links */}
              <div className="p-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-3.5 hover:bg-neutral-50 rounded-2xl transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-neutral-50 text-neutral-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        <link.icon size={18} />
                      </div>
                      <span className="text-[15px] font-bold text-neutral-800">
                        {link.name}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-neutral-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
              </div>

              {/* Categories Grid Section */}
              <div className="p-4 bg-neutral-50/50 border-y border-neutral-100">
                <div className="flex items-center justify-between mb-4 px-1">
                  <p className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.1em]">
                    All Categories
                  </p>
                  <span className="h-[1px] flex-grow ml-4 bg-neutral-200/60"></span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {moreCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-neutral-200/60 shadow-sm active:scale-[0.97] transition-all"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-50">
                        <cat.icon size={12} className="text-blue-600" />
                      </div>
                      <span className="text-[12px] font-bold text-neutral-700 truncate">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Action Buttons (Sticky at bottom of menu) */}
            <div className="p-4 bg-white border-t border-neutral-100 shrink-0 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/bookmarks"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-neutral-100 text-neutral-900 font-bold text-sm active:scale-95 transition-all"
                >
                  <Bookmark size={16} /> Saved
                </Link>
                <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 active:scale-95 transition-all">
                  <UserCircle2 size={16} /> Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
