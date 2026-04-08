"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Yaha aap apni API call karenge password reset link bhejne ke liye
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#fafcff] selection:bg-blue-200 selection:text-blue-900 font-sans p-4 relative overflow-hidden">
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* --- CENTERED CARD --- */}
      <div className="w-full max-w-[440px] bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-slate-200/60 p-8 sm:p-10 relative z-10 overflow-hidden">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-2 rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-950">
              ToolsVerse<span className="text-blue-600">.</span>AI
            </span>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* --- STEP 1: REQUEST FORM --- */
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                  Reset password
                </h2>
                <p className="text-slate-500 font-medium text-sm px-2">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[14px] font-medium placeholder:text-slate-400 shadow-sm"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 mt-6 bg-slate-950 hover:bg-blue-600 text-white rounded-xl font-bold text-[15px] transition-all shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 cursor-pointer group"
                >
                  Send reset link
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-950 transition-colors group cursor-pointer"
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Back to login
                </Link>
              </div>
            </motion.div>
          ) : (
            /* --- STEP 2: SUCCESS MESSAGE --- */
            <motion.div
              key="success"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-3">
                Check your email
              </h2>

              <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">
                We've sent a password reset link to <br />
                <span className="font-bold text-slate-900">{email}</span>.{" "}
                <br />
                Please check your inbox.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => (window.location.href = "mailto:")}
                  className="w-full flex items-center justify-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[15px] transition-all shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 cursor-pointer"
                >
                  Open Email App
                </button>

                <div className="text-sm font-medium text-slate-500">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="font-bold text-slate-950 hover:text-blue-600 transition-colors cursor-pointer underline decoration-slate-300 underline-offset-4 hover:decoration-blue-600"
                  >
                    Click to resend
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-950 transition-colors group cursor-pointer"
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Back to login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
