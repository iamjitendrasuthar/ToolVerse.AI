"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
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
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { fetchBookmarks } from "@/Store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbData, setDbData] = useState({ tools: [], categories: [] });
  const { data: session, status } = useSession();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const { bookmarkIds } = useAppSelector((state) => state.user);
  const totalBookmarks = bookmarkIds.length;
  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);
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
  const handleLogout = async () => {
    // Logout toast trigger karein
    toast.success("Logged out successfully", {
      description: "See you again soon!",
    });

    // Chhota sa delay taaki user toast dekh le, phir sign out karein
    setTimeout(async () => {
      await signOut({ callbackUrl: "/login" });
    }, 1000);
  };
  return (
    <div className="fixed top-0 md:top-4 inset-x-0 z-50 flex justify-center w-full md:px-6 pointer-events-none">
      {" "}
      <nav
        className={`relative w-full max-w-[1400px] pointer-events-auto transition-all duration-500 ease-out md:rounded-2xl md:rounded-full border
    ${
      scrolled
        ? "bg-white/80 backdrop-blur-2xl border-neutral-200/50 shadow-lg py-2"
        : "bg-white/70 backdrop-blur-xl border-white/60 md:shadow-xl py-3"
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
                  const isDropdownActive = link.items?.some(
                    (item) => pathname === item.href,
                  );
                  return (
                    <div key={link.name} className="relative group">
                      <button
                        className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center gap-1.5 cursor-pointer
            ${
              isDropdownActive
                ? "bg-white text-blue-600 shadow-sm" // Active state jab sub-link open ho
                : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
            }`}
                      >
                        <link.icon
                          size={16}
                          className={
                            isDropdownActive ? "text-blue-600" : "opacity-70"
                          }
                        />
                        {link.name}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 group-hover:rotate-180 
              ${isDropdownActive ? "text-blue-600" : "text-neutral-400"}`}
                        />
                      </button>

                      {/* Mega Dropdown Style */}
                      <div className="absolute top-full left-0 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="w-[720px] p-4 bg-white border border-neutral-200/60 rounded-3xl shadow-2xl grid grid-cols-3 gap-1">
                          <p className="col-span-3 text-[10px] uppercase tracking-widest text-neutral-400 font-bold px-3 mb-2">
                            Explore All {link.name}
                          </p>

                          {link.items?.map((item) => {
                            // 1. Active state check karein
                            const isSubActive = pathname === item.href;

                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 text-sm font-semibold rounded-2xl transition-all group/item
            ${
              isSubActive
                ? "bg-blue-50 text-blue-600" // Active State: Light blue background and blue text
                : "text-neutral-600 hover:text-blue-600 hover:bg-blue-50/50" // Normal State
            }`}
                              >
                                <div
                                  className={`p-2 rounded-xl transition-colors
            ${
              isSubActive
                ? "bg-white shadow-sm" // Active State Icon container
                : "bg-neutral-50 group-hover/item:bg-white"
            }`}
                                >
                                  <item.icon
                                    size={16}
                                    className={`${isSubActive ? "text-blue-600" : "text-neutral-500 group-hover/item:text-blue-600"}`}
                                  />
                                </div>

                                <span>{item.name}</span>

                                {/* Optional: Chota sa active dot agar aapko aur premium dikhana ho */}
                                {isSubActive && (
                                  <div className="ml-auto w-1 h-1 bg-blue-600 rounded-full" />
                                )}
                              </Link>
                            );
                          })}
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

              <div className="hidden sm:block">
                {status === "loading" ? (
                  /* --- SKELETON TRIGGER (Desktop flicker fix) --- */
                  <div className="flex items-center gap-2 p-1 pr-4 bg-white rounded-full border border-neutral-100 shadow-sm animate-pulse w-[130px] h-[42px]">
                    <div className="w-8 h-8 bg-neutral-100 rounded-full"></div>
                    <div className="h-3 w-16 bg-neutral-100 rounded-full"></div>
                  </div>
                ) : session?.user ? (
                  <div className="relative group/menu">
                    {" "}
                    {/* --- TRIGGER BUTTON --- */}
                    <button className="hidden sm:flex items-center gap-2 p-1 pr-4 bg-white hover:bg-neutral-50 rounded-full transition-all border border-neutral-200/60 shadow-sm cursor-pointer active:scale-95">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black shadow-inner">
                          {session.user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <span className="hidden md:inline text-[13px] font-bold text-neutral-700 tracking-tight">
                        My Space
                      </span>
                      <ChevronDown
                        size={14}
                        className="text-neutral-400 transition-transform duration-300 group-hover:rotate-180"
                      />
                    </button>
                    {/* --- DROPDOWN MENU --- */}
                    {status === "authenticated" && (
                      <div
                        className="group-hover/menu:opacity-100
group-hover/menu:visible
group-hover/menu:pointer-events-auto
group-hover/menu:translate-y-0 absolute top-full right-0 mt-3 w-64 rounded-[2rem] bg-white border border-neutral-200/70 shadow-2xl opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden"
                      >
                        <div className="px-6 py-5 bg-neutral-50/50 border-b border-neutral-100">
                          <p className="text-sm font-black text-neutral-800 truncate leading-none">
                            {session.user.name}
                          </p>
                          <p className="text-[11px] font-medium text-neutral-400 truncate mt-1.5 uppercase tracking-wider">
                            {session.user.email}
                          </p>
                        </div>

                        {/* Action Links */}
                        <div className="p-2">
                          <Link
                            href="/bookmarks"
                            className="flex items-center justify-between w-full px-4 py-3 rounded-[1.2rem] text-neutral-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all group/item"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-neutral-100 rounded-xl group-hover/item:bg-blue-100/50 transition-colors">
                                <Bookmark size={18} />
                              </div>
                              <span className="text-sm font-bold">
                                My Bookmarks
                              </span>
                            </div>
                            <span className="w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 text-[10px] font-black rounded-full scale-0 group-hover/item:scale-100 transition-transform">
                              {totalBookmarks}
                            </span>
                          </Link>

                          <Link
                            href="/profile/edit"
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-[1.2rem] text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50 transition-all"
                          >
                            <div className="p-2 bg-neutral-100 rounded-xl">
                              <UserCircle2 size={18} />
                            </div>
                            <span className="text-sm font-bold">
                              Profile Settings
                            </span>
                          </Link>
                        </div>

                        {/* Logout Footer */}
                        <div className="p-2 bg-neutral-50/30">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-[1.2rem] text-sm font-bold text-red-500 hover:bg-red-50 transition-all active:scale-[0.98]"
                          >
                            <div className="p-2 bg-red-100/50 rounded-xl">
                              <LogOut size={16} />
                            </div>
                            Logout Session
                          </button>
                        </div>
                      </div>
                    )}{" "}
                  </div>
                ) : (
                  /* --- LOGGED OUT VIEW --- */
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-2 p-1 pr-3 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-all border border-neutral-200/50 cursor-pointer"
                  >
                    <div className="bg-white p-1.5 rounded-full shadow-sm">
                      <UserCircle2 size={18} className="text-neutral-600" />
                    </div>
                    <span className="text-sm font-bold text-neutral-700">
                      Sign In
                    </span>
                  </Link>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 bg-neutral-100 text-neutral-600 rounded-xl active:scale-95 transition-all cursor-pointer"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE NAV (The Full ToolsVerse AI Experience) --- */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full md:mt-4 z-50 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
            isOpen
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 -translate-y-8 invisible pointer-events-none"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-2xl overflow-hidden flex flex-col max-h-[75vh] rounded-2xl">
            {/* 1. Scrollable Main Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">
              {/* SECTION A: Quick Links (Compact Grid) 
              */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 pl-2 mb-3 block">
                  Quick Links
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {navLinks
                    .filter((link) => !link.isDropdown)
                    .map((link) => (
                      <Link
                        key={link.name}
                        href={link.href as string}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl hover:bg-neutral-50 active:bg-neutral-100 transition-colors group"
                      >
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-neutral-100/80 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                          <link.icon size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-600 group-hover:text-neutral-900">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>

              {/* SECTION B: Deep Dive Accordions (Categories & Use Cases) */}
              <div className="space-y-3 pt-2">
                <span className="px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Discover More
                </span>

                {navLinks
                  .filter((link) => link.isDropdown)
                  .map((dropdownSection) => {
                    const isExpanded = activeAccordion === dropdownSection.name;

                    return (
                      <div
                        key={dropdownSection.name}
                        className={`rounded-[2.2rem] border transition-all duration-500 ${
                          isExpanded
                            ? "bg-white border-blue-100 shadow-xl shadow-blue-500/5 ring-4 ring-blue-50/50"
                            : "bg-neutral-50/50 border-transparent"
                        }`}
                      >
                        {/* Header Toggle */}
                        <button
                          onClick={() =>
                            setActiveAccordion(
                              isExpanded ? null : dropdownSection.name,
                            )
                          }
                          className="w-full flex items-center justify-between p-5"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-500 ${isExpanded ? "bg-blue-600 text-white" : "bg-white text-neutral-400 shadow-sm"}`}
                            >
                              <dropdownSection.icon size={18} />
                            </div>
                            <span
                              className={`text-[15px] font-extrabold tracking-tight transition-colors ${isExpanded ? "text-neutral-900" : "text-neutral-500"}`}
                            >
                              {dropdownSection.name}
                            </span>
                          </div>
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${isExpanded ? "bg-blue-50 rotate-180" : "bg-white shadow-sm"}`}
                          >
                            <ChevronDown
                              size={14}
                              className={
                                isExpanded
                                  ? "text-blue-600"
                                  : "text-neutral-300"
                              }
                            />
                          </div>
                        </button>

                        {/* Grid Content */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${
                            isExpanded
                              ? "max-h-[800px] opacity-100 pb-6 px-4"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            {dropdownSection.items?.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2.5 p-3 rounded-2xl bg-neutral-50/80 hover:bg-white border border-transparent hover:border-neutral-200 transition-all group/item"
                              >
                                <div className="p-1.5 rounded-lg bg-white shadow-sm group-hover/item:text-blue-600">
                                  <item.icon size={12} />
                                </div>
                                <span className="text-[11px] font-bold text-neutral-600 group-hover/item:text-blue-600 truncate">
                                  {item.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="p-6 bg-white border-t border-neutral-100">
              {/* --- STATUS CHECK: Jab tak loading hai, flicker nahi hoga --- */}
              {status === "loading" ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="flex-1 h-12 bg-neutral-100 rounded-[1.5rem]"></div>
                  <div className="flex-1 h-12 bg-neutral-100 rounded-[1.5rem]"></div>
                </div>
              ) : session?.user ? (
                <div className="flex flex-col gap-4">
                  {/* 1. Profile Card Section */}
                  <div className="bg-neutral-50/80 border border-neutral-100 p-4 rounded-[2.2rem] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg shadow-blue-500/20">
                          {session.user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-4 border-neutral-50 rounded-full"></span>
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[15px] font-black text-neutral-800 truncate leading-none mb-1">
                          {session.user.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate font-medium tracking-tight">
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile/edit"
                      onClick={() => setIsOpen(false)}
                      className="p-2.5 bg-white rounded-xl border border-neutral-200 shadow-sm text-neutral-500 hover:text-blue-600 active:scale-90 transition-all"
                    >
                      <Edit3 size={18} />
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Bookmarks Button */}
                    <Link
                      href="/bookmarks"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 py-4 rounded-[1.5rem] bg-blue-50 text-blue-600 font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-all border border-blue-100 hover:bg-blue-100"
                    >
                      <Bookmark size={18} />
                      Saved
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                      className="flex-1 py-4 rounded-[1.5rem] bg-red-50 text-red-500 font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-all border border-red-100 cursor-pointer hover:bg-red-100"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                /* --- LOGGED OUT VIEW (Modern Glass Style) --- */
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4.5 rounded-[1.8rem] bg-neutral-900 text-white font-bold text-[15px] flex items-center justify-center gap-3 shadow-2xl shadow-neutral-900/20 active:scale-95 transition-all"
                  >
                    <div className="bg-white/10 p-1.5 rounded-lg">
                      <UserCircle2 size={18} />
                    </div>
                    Sign in to Account
                  </Link>

                  <p className="text-[11px] text-center text-neutral-400 font-bold uppercase tracking-[0.2em]">
                    New to ToolsVerse?{" "}
                    <Link href="/login" className="text-blue-600 ml-1">
                      Join Now
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
