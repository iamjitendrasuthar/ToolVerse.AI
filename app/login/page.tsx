"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { SiGoogle, SiGithub } from "react-icons/si";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for visibility
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          setError("Invalid email or password. Please try again.");
          toast.error("Authentication failed!");
        } else {
          toast.success("Login successful.");

          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        }
      } else {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success("Account created!", {
            description: "You can now sign in with your credentials.",
          });
          setIsLogin(true);
          setFormData({ ...formData, password: "" });
          alert("Account created successfully! Please sign in.");
        } else {
          setError(data.message || "Something went wrong during registration.");
          toast.error(data.message || "Registration failed");
        }
      }
    } catch (err) {
      setError("A network error occurred. Please check your connection.");
      toast.error("Network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#fafcff] selection:bg-blue-200 selection:text-blue-900 font-sans p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-slate-200/60 p-8 sm:p-10 relative z-10">
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

        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            {isLogin
              ? "Enter your credentials to access your account."
              : "Join us to save tools, leave reviews, and more."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in fade-in zoom-in-95">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleSocialAuth("google")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200/80 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl font-bold text-[13px] text-slate-700 transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <SiGoogle className="text-rose-500" size={16} />
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialAuth("github")}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200/80 hover:border-blue-200 hover:bg-blue-50/50 rounded-xl font-bold text-[13px] text-slate-700 transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <SiGithub size={16} className="text-slate-900" />
            GitHub
          </button>
        </div>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  />
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 text-[14px] font-medium placeholder:text-slate-400 shadow-sm"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 text-[14px] font-medium placeholder:text-slate-400 shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                {isLogin && (
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 text-[14px] font-medium placeholder:text-slate-400 shadow-sm"
                  required
                />
                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-6 bg-slate-950 hover:bg-blue-600 text-white rounded-xl font-bold text-[15px] transition-all shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 cursor-pointer group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </motion.form>
        </AnimatePresence>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setShowPassword(false); // Reset eye state on toggle
            }}
            className="font-bold text-slate-950 hover:text-blue-600 transition-colors cursor-pointer"
          >
            {isLogin ? "Sign up for free" : "Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
