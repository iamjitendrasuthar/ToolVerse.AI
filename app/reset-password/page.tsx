"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Lock,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#fafcff] selection:bg-blue-200 selection:text-blue-900 font-sans p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-[100px]" />
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-200/60 p-8 sm:p-10 relative z-10 overflow-hidden">
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-950">
              ToolsVerse<span className="text-blue-600">.</span>AI
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="reset-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                  New Password
                </h2>
                <p className="text-slate-500 font-medium text-[15px]">
                  Choose a password you haven't used before.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
                    New Password
                  </label>

                  <div className="relative group">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-950 font-medium placeholder:text-slate-300"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
                    Confirm Password
                  </label>

                  <div className="relative group">
                    <ShieldCheck
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-950 font-medium placeholder:text-slate-300"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 mt-2 bg-slate-950 hover:bg-blue-600 disabled:opacity-70 text-white rounded-2xl font-bold text-[15px] transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] cursor-pointer group"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                     <>
                      Update Password
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>

              <h2 className="text-2xl font-black text-slate-950 mb-2 tracking-tight">
                Success!
              </h2>

              <p className="text-slate-500 font-medium text-sm mb-8">
                Your password is updated. Taking you to login...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
