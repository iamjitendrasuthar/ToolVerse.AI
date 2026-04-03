"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, CornerDownRight } from "lucide-react";
import { SiX, SiGithub, SiFacebook, SiDiscord } from "react-icons/si";
import { motion } from "framer-motion";

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
        { name: "New Arrivals", href: "/new" },
        { name: "Verified Reviews", href: "/reviews" },
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
    <footer className="relative backdrop-blur-md overflow-hidden z-30">
      {/* --- Ambient Background Glow --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[40%] rounded-full bg-blue-100/30 blur-[120px]" />
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[40%] rounded-full bg-purple-100/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 py-10 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* --- BRAND COLUMN (Spans 4) --- */}
          <div className="lg:col-span-4 flex flex-col items-start gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles
                size={20}
                className="text-white group-hover:text-blue-500 transition-colors"
              />
              <span className="text-xl font-extrabold tracking-tighter text-white">
                ToolsVerse<span className="text-blue-500">.</span>AI
              </span>
            </Link>

            <p className="text-sm font-medium leading-relaxed max-w-sm text-[#71717a]">
              The definitive directory for next-generation artificial
              intelligence. Curating the tools that build the future.
            </p>

            <form
              className="w-full max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="footer-email"
                className="text-xs font-bold uppercase tracking-widest text-[#71717a] mb-2.5 block"
              >
                Stay updated
              </label>
              <div className="relative group">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-4 pr-12 py-3 bg-[#111114] border border-[#27272a] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all font-medium placeholder:text-[#3f3f46] text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#1a1a1d] group-focus-within:bg-blue-600 flex items-center justify-center text-[#71717a] group-focus-within:text-white transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* --- LINKS COLUMNS (Spans 8) --- */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#71717a]">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name} className="flex items-center group">
                      <CornerDownRight
                        size={12}
                        className="text-[#3f3f46] mr-2.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                      <Link
                        href={link.href}
                        className="text-[14px] font-medium text-[#a1a1a6] hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* --- SOCIAL / CONNECT COLUMN (Desktop Only) --- */}
            <div className="hidden md:block lg:col-span-1 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#71717a]">
                Connect
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    title={social.label}
                    className="w-full h-10 flex items-center justify-center rounded-lg bg-[#111114] border border-[#27272a] hover:bg-[#1a1a1d] hover:border-[#3f3f46] text-[#71717a] hover:text-white transition-all duration-200"
                  >
                    <social.Icon size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER BOTTOMBAR --- */}
        <div className="mt-20 pt-8 border-t border-[#1f1f23] flex flex-col sm:flex-row items-center justify-between gap-6 text-[13px] text-[#52525b] font-medium">
          <p>© {currentYear} ToolsVerse.ai — All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-white transition-colors"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
