"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Send } from "lucide-react";
import { SiX, SiGithub, SiFacebook, SiDiscord } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: SiX, href: "#", label: "X" },
    { Icon: SiGithub, href: "#", label: "GitHub" },
    { Icon: SiFacebook, href: "#", label: "Facebook" },
    { Icon: SiDiscord, href: "#", label: "Discord" },
  ];

  const footerSections = [
    {
      title: "Discover",
      links: [
        { name: "Image Generation", href: "/category/image-generation" },
        { name: "Video Editing AI", href: "/category/video-editing" },
        { name: "Coding Assistants", href: "/category/coding-tools" },
        { name: "Writing & Content", href: "/category/writing-tools" },
      ],
    },
    {
      title: "Curation",
      links: [
        { name: "Top Rated Tools", href: "/category/top-rated" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "Trending Now", href: "/trending" },
        { name: "API Access", href: "/api" },
      ],
    },
    {
      title: "Platform",
      links: [
        { name: "About ToolsVerse", href: "/about" },
        { name: "Submit Your AI", href: "/submit" },
        { name: "Advertise", href: "/advertise" },
        { name: "Status", href: "/status" },
      ],
    },
  ];

  return (
    <footer className="relative bg-white overflow-hidden z-30 pt-1">
      {/* --- Premium Top Gradient Border --- */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* --- Ambient Background Glow --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute top-[10%] left-[-5%] w-[35%] h-[40%] rounded-full bg-indigo-100/40 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* --- BRAND COLUMN (Spans 4) --- */}
          <div className="lg:col-span-4 flex flex-col items-start gap-8 lg:pr-10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles size={20} className="text-white animate-pulse" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                ToolsVerse<span className="text-blue-600">.</span>AI
              </span>
            </Link>

            <p className="text-[15px] font-medium leading-relaxed text-slate-500">
              The definitive directory for next-generation artificial
              intelligence. Curating the tools that build the future.
            </p>

            <form
              className="w-full max-w-sm mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="footer-email"
                className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block"
              >
                Join our newsletter
              </label>
              <div className="relative group flex items-center">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-5 pr-14 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium placeholder:text-slate-400 text-slate-900 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </form>
          </div>

          {/* --- LINKS COLUMNS (Spans 8) --- */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 lg:pl-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="inline-block text-[14px] font-semibold text-slate-500 hover:text-blue-600 hover:translate-x-1.5 transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* --- SOCIAL / CONNECT COLUMN --- */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Connect
              </h4>
              <div className="grid grid-cols-4 lg:grid-cols-2 gap-3">
                {socialLinks.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    title={social.label}
                    className="w-full h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 text-slate-400 hover:text-blue-600 transition-all duration-300 shadow-sm"
                  >
                    <social.Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER BOTTOMBAR --- */}
        <div className="mt-20 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-slate-500 font-medium">
          <p>
            © {currentYear}{" "}
            <span className="font-bold text-slate-700">ToolsVerse.ai</span> —
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-blue-600 transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
