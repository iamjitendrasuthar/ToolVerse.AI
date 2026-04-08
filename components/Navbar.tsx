"use client";

import { useState, useEffect, useMemo } from "react";
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
  Layers,
  Briefcase,
  PlusCircle,
  Box,
  Headphones,
  Gamepad2,
  Users,
  Scale,
  Presentation,
  Building,
  Microscope,
  Languages,
  FileText,
  Megaphone,
  Lightbulb,
  GraduationCap,
  Terminal,
  Rocket,
  DollarSign,
  Edit3,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbData, setDbData] = useState({ tools: [], categories: [] });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. Categories List
  const categoriesList = [
    { name: "Coding", href: "/category/coding-tools", icon: Code2 },
    { name: "Images", href: "/category/image-generation", icon: ImageIcon },
    { name: "Video", href: "/category/video-editing", icon: Video },
    { name: "Writing", href: "/category/writing-tools", icon: PenTool },
    { name: "Audio & Voice", href: "/category/audio-tools", icon: Mic2 },
    { name: "Music", href: "/category/music-generation", icon: Music },
    { name: "3D & Animation", href: "/category/3d-animation", icon: Box },
    { name: "Design & UI", href: "/category/design-tools", icon: Palette },
    {
      name: "Presentations",
      href: "/category/presentations",
      icon: Presentation,
    },
    { name: "Business", href: "/category/business", icon: Briefcase },
    { name: "Marketing", href: "/category/marketing-tools", icon: TrendingUp },
    { name: "SEO Tools", href: "/category/seo", icon: Globe },
    { name: "Social Media", href: "/category/social-media", icon: Share2 },
    { name: "Email AI", href: "/category/email-ai", icon: Mail },
    { name: "Productivity", href: "/category/productivity-tools", icon: Zap },
    { name: "Automation", href: "/category/automation", icon: Bot },
    {
      name: "Data & Analysis",
      href: "/category/data-analysis",
      icon: BarChart3,
    },
    { name: "Research", href: "/category/research", icon: Microscope },
    { name: "Chatbots", href: "/category/chatbots", icon: MessageSquare },
    {
      name: "Customer Support",
      href: "/category/customer-support",
      icon: Headphones,
    },
    { name: "Translation", href: "/category/translation", icon: Languages },
    { name: "Education", href: "/category/study-tools", icon: BookOpen },
    { name: "HR & Recruiting", href: "/category/hr-recruiting", icon: Users },
    { name: "Legal", href: "/category/legal", icon: Scale },
    { name: "Real Estate", href: "/category/real-estate", icon: Building },
    { name: "Gaming", href: "/category/gaming", icon: Gamepad2 },
  ];

  // 2. Comprehensive Use Cases List
  const useCasesList = [
    // Persona Based
    { name: "For Students", href: "/use-case/students", icon: GraduationCap },
    { name: "For Developers", href: "/use-case/developers", icon: Terminal },
    { name: "For Designers", href: "/use-case/designers", icon: PenTool },
    { name: "For Marketers", href: "/use-case/marketers", icon: Megaphone },
    { name: "For Creators", href: "/use-case/creators", icon: Video },
    { name: "For Writers", href: "/use-case/writers", icon: FileText },
    { name: "For Startups", href: "/use-case/startups", icon: Rocket },
    {
      name: "For Researchers",
      href: "/use-case/researchers",
      icon: Microscope,
    },
    { name: "For Sales Teams", href: "/use-case/sales", icon: DollarSign },
    { name: "For HR & Recruiting", href: "/use-case/hr", icon: Users },

    // Task Based
    { name: "Writing Blogs", href: "/use-case/blog-writing", icon: Edit3 },
    { name: "SEO Optimization", href: "/use-case/seo", icon: Search },
    { name: "Data Analysis", href: "/use-case/data-analysis", icon: BarChart3 },
    {
      name: "Customer Support",
      href: "/use-case/customer-support",
      icon: Headphones,
    },
    {
      name: "Idea Brainstorming",
      href: "/use-case/brainstorming",
      icon: Lightbulb,
    },
    { name: "Translation", href: "/use-case/translation", icon: Languages },
  ];

  // 3. Main Navigation Links
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Categories",
      isDropdown: true,
      items: categoriesList,
      icon: Layers,
    },
    {
      name: "Use Cases",
      isDropdown: true,
      items: useCasesList,
      icon: Briefcase,
    },
    { name: "New Arrivals", href: "/new-arrivals", icon: Sparkles },
    { name: "Trending", href: "/trending", icon: TrendingUp },
  ];

  useEffect(() => {
    if (isSearchOpen) {
      fetch("/api/search-data")
        .then((res) => res.json())
        .then((data) => {
          setDbData(data);
        })
        .catch((err) => console.error("Search fetch error:", err));
    }
  }, [isSearchOpen]);

  // Combined Filtering Logic
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
                // Dropdowns
                if (link.isDropdown) {
                  return (
                    <div key={link.name} className="relative group">
                      <button className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-white/60 cursor-pointer">
                        <link.icon size={16} className="opacity-70" />
                        {link.name}
                        <ChevronDown
                          size={14}
                          className="group-hover:rotate-180 transition-transform duration-300"
                        />
                      </button>

                      {/* Mega Dropdown Style */}
                      <div className="absolute top-full left-0 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="w-[720px] p-4 bg-white border border-neutral-200/60 rounded-3xl shadow-2xl grid grid-cols-3 gap-1">
                          <p className="col-span-3 text-[10px] uppercase tracking-widest text-neutral-400 font-bold px-3 mb-2">
                            Explore All {link.name}
                          </p>

                          {link.items?.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-2xl hover:bg-blue-50 transition-all text-neutral-600 hover:text-blue-600 group/item"
                            >
                              <div className="p-2 rounded-xl bg-neutral-50 group-hover/item:bg-white transition-colors">
                                <item.icon
                                  size={16}
                                  className="text-neutral-500 group-hover/item:text-blue-600"
                                />
                              </div>

                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Normal Links
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href as string}
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
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 bg-neutral-100 rounded-full text-neutral-600 hover:text-blue-600 transition-all cursor-pointer"
              >
                <Search size={20} />
              </button>

              {isSearchOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] m-0">
                  <div
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute inset-0"
                  />
                  <div className="relative w-full max-w-3xl sm:translate-x-10 lg:translate-x-50">
                    <div className="relative w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)] animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                          <Search size={16} />
                        </div>

                        <input
                          autoFocus
                          placeholder="Search AI tools, categories..."
                          className="flex-1 bg-transparent text-[16px] font-medium text-slate-800 outline-none placeholder:text-slate-400"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearchOpen(false);
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div
                        className="max-h-[60vh] overflow-y-auto px-5 py-4 custom-scrollbar"
                        style={{ WebkitOverflowScrolling: "touch" }}
                      >
                        {!searchQuery ? (
                          <div className="flex flex-col items-center justify-center py-14 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                              <Sparkles size={22} />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800">
                              Discover AI Tools
                            </h3>
                            <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-400">
                              Search tools, categories, productivity apps,
                              design platforms, coding assistants and more.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-5">
                            {results.categories.length > 0 && (
                              <section>
                                <div className="mb-3 flex items-center justify-between px-1">
                                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    Categories
                                  </h3>
                                  <span className="text-[10px] font-medium text-slate-300">
                                    {results.categories.length} found
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                  {results.categories.map((cat: any) => (
                                    <Link
                                      key={cat.slug}
                                      href={cat.href}
                                      onClick={() => setIsSearchOpen(false)}
                                      className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50 px-3 py-3 transition-all duration-150 hover:border-slate-300 hover:bg-white"
                                    >
                                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-500 border border-slate-100">
                                        <LayoutGrid size={15} />
                                      </div>
                                      <div className="min-w-0">
                                        <p className="truncate text-[13px] font-semibold text-slate-700">
                                          {cat.name}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </section>
                            )}

                            {results.tools.length > 0 && (
                              <section>
                                <div className="mb-3 flex items-center justify-between px-1">
                                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    Tools
                                  </h3>
                                  <span className="text-[10px] font-medium text-slate-300">
                                    {results.tools.length} found
                                  </span>
                                </div>
                                <div className="space-y-1">
                                  {results.tools.map((tool: any) => (
                                    <Link
                                      key={tool.slug}
                                      href={tool.websiteUrl}
                                      onClick={() => setIsSearchOpen(false)}
                                      className="group flex items-center justify-between rounded-2xl px-3 py-3 transition-colors duration-150 hover:bg-slate-50"
                                    >
                                      <div className="flex min-w-0 items-center gap-3">
                                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                          {tool.imageUrl ? (
                                            <img
                                              src={tool.imageUrl}
                                              alt={tool.name}
                                              loading="lazy"
                                              className="h-full w-full object-contain"
                                            />
                                          ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-[11px] font-bold text-white">
                                              {tool.name
                                                .substring(0, 2)
                                                .toUpperCase()}
                                            </div>
                                          )}
                                        </div>
                                        <div className="min-w-0">
                                          <h4 className="truncate text-sm font-semibold text-slate-800">
                                            {tool.name}
                                          </h4>
                                          <p className="truncate text-[11px] text-slate-400">
                                            {tool.category}
                                          </p>
                                        </div>
                                      </div>
                                      <ArrowRight
                                        size={15}
                                        className="shrink-0 text-slate-300 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-slate-500"
                                      />
                                    </Link>
                                  ))}
                                </div>
                              </section>
                            )}

                            {searchQuery &&
                              results.categories.length === 0 &&
                              results.tools.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-14 text-center">
                                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                    <Search size={18} />
                                  </div>
                                  <h3 className="text-sm font-semibold text-slate-700">
                                    No results found
                                  </h3>
                                  <p className="mt-1 text-xs text-slate-400">
                                    Try searching for another tool or category.
                                  </p>
                                </div>
                              )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          ToolsVerse Directory
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-[10px] font-medium text-slate-500">
                            Live Search
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

        {/* --- MOBILE NAV (Scrollable & Future-Proof) --- */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full mt-2 z-50 transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-2 invisible pointer-events-none"
          }`}
        >
          <div className="bg-white border border-neutral-200/70 rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-3 pb-1">
              {navLinks
                .filter((link) => !link.isDropdown)
                .map((link) => (
                  <Link
                    key={link.name}
                    href={link.href as string}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 rounded-2xl transition-all group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-neutral-100 text-neutral-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <link.icon size={16} strokeWidth={2.5} />
                    </div>
                    <span className="text-[14px] font-bold text-neutral-800">
                      {link.name}
                    </span>
                    <ArrowRight
                      size={12}
                      className="ml-auto text-neutral-300 group-hover:text-blue-500 transition-all"
                    />
                  </Link>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar border-t border-neutral-100">
              {navLinks
                .filter((link) => link.isDropdown)
                .map((dropdownSection) => (
                  <div
                    key={dropdownSection.name}
                    className="px-4 py-3 bg-neutral-50/50 border-b border-neutral-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3 mb-2 px-1">
                      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        {dropdownSection.name}
                      </p>
                      <div className="h-[1px] flex-1 bg-neutral-200/60"></div>
                    </div>

                    <div className="max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
                      <div className="grid grid-cols-2 gap-2">
                        {dropdownSection.items?.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-neutral-200/60 hover:border-blue-300 transition-all active:scale-95 shadow-sm"
                          >
                            <div className="p-1.5 rounded-lg bg-blue-50">
                              <item.icon size={12} className="text-blue-600" />
                            </div>
                            <span className="text-[12px] font-semibold text-neutral-700 truncate">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-4 bg-white border-t border-neutral-100 mt-auto">
              <div className="flex gap-2">
                <Link
                  href="/bookmarks"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-100 text-neutral-800 font-bold text-[13px] active:scale-95 transition-all"
                >
                  <Bookmark size={14} /> Saved
                </Link>
                <button className="flex-[1.5] flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-[13px] shadow-lg shadow-blue-100 active:scale-95 transition-all">
                  <UserCircle2 size={14} /> Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
