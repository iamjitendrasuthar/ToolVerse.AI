"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Camera,
  Bookmark,
  Sparkles,
  UserCheck,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { useAppSelector } from "@/Store/hooks";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ProfileDashboard() {
  const { data: session, update } = useSession();
  const { bookmarkIds } = useAppSelector((state) => state.user);
  const totalBookmarks = bookmarkIds.length;

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profession: "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  useEffect(() => {
    if (session?.user) {
      const data = {
        name: session.user.name || "",
        email: session.user.email || "",
        mobile: (session.user as any).mobile || "",
        profession: (session.user as any).profession || "",
      };
      setOriginalData(data);
      setFormData(data);
    }
  }, [session]);

  // Validation Logic
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.email);
  const isNameValid = formData.name.trim().length >= 2;

  // Mobile validation for PhoneInput (including country code it usually length > 10)
  const isMobileValid = formData.mobile.length >= 8;

  const isModified = useMemo(() => {
    return JSON.stringify(originalData) !== JSON.stringify(formData);
  }, [formData, originalData]);

  const canSave =
    isModified && isEmailValid && isNameValid && isMobileValid && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isNameValid) return toast.error("Please enter a valid name");
    if (!isEmailValid) return toast.error("Please enter a valid email address");

    setLoading(true);
    const loadingToast = toast.loading("Syncing profile...");

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await update({
          user: {
            ...session?.user,
            name: formData.name,
            email: formData.email,
            // @ts-ignore
            mobile: formData.mobile,
            // @ts-ignore
            profession: formData.profession,
          },
        });
        setOriginalData(formData);
        setStatus("success");
        toast.success("Profile updated successfully!", { id: loadingToast });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch (error) {
      setStatus("error");
      toast.error("Failed to update profile", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };
  const getInitials = (name: string) => {
    if (!name) return "U";

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };
  return (
    <main className="min-h-screen bg-[#fcfdfe] text-slate-900 pb-24 relative overflow-hidden">
      {/* STEP 3: Global CSS to match your UI */}
      <style jsx global>{`
        .phone-input-container .form-control {
          width: 100% !important;
          background: #f8fafc !important; /* bg-slate-50 */
          border: 1px solid #e2e8f0 !important; /* border-slate-200 */
          border-radius: 1.5rem !important;
          height: 60px !important;
          padding-left: 58px !important;
          font-weight: 700 !important;
          color: #1e293b !important;
          font-family: inherit !important;
          transition: all 0.2s ease;
        }
        .phone-input-container .form-control:focus {
          border-color: #3b82f6 !important;
          background: white !important;
          box-shadow: 0 0 0 1px #3b82f6 !important;
        }
        .phone-input-container .flag-dropdown {
          background: transparent !important;
          border: none !important;
          border-radius: 1.5rem 0 0 1.5rem !important;
        }
        .phone-input-container .selected-flag {
          background: transparent !important;
          padding-left: 14px !important;
        }
        .phone-input-container .selected-flag:hover {
          background: transparent !important;
        }
        .phone-input-container .country-list {
          border-radius: 1rem !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
          border: 1px solid #f1f5f9 !important;
          margin-top: 10px !important;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-24 md:pt-32">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-all mb-4"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to ToolsVerse
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Edit <span className="text-blue-600">Profile</span>
            </h1>
          </motion.div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] border border-slate-200 p-10 shadow-xl shadow-blue-500/5 relative"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-40 h-40 mb-8 group">
                  <div className="w-full h-full rounded-[3rem] bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-2xl transition-transform group-hover:scale-[1.02]">
                    <div className="w-full h-full rounded-[2.8rem] bg-white p-1 overflow-hidden relative">
                      <div className="w-full h-full rounded-[2.5rem] bg-slate-50 flex items-center justify-center overflow-hidden">
                        <span className="text-5xl font-black text-blue-600">
                          {getInitials(formData.name)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-10">
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    {formData.name || "Member Name"}
                  </h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                    <UserCheck size={14} className="text-blue-600" /> Verified
                    Member
                  </p>
                </div>

                <Link href="/bookmarks" className="w-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <Bookmark size={20} className="fill-current" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                          Saved Tools
                        </p>
                        <p className="text-2xl font-black text-slate-900">
                          {totalBookmarks}
                        </p>
                      </div>
                    </div>
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <Sparkles
                        size={20}
                        className="text-blue-200 group-hover:opacity-0 group-hover:scale-50 transition-all duration-300 absolute"
                      />
                      <div className="opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 text-blue-600 absolute bg-blue-50 p-2 rounded-xl">
                        <ArrowUpRight size={18} strokeWidth={3} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-blue-500/5 h-full flex flex-col"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 flex-grow">
                <InputField
                  label="Full Name"
                  icon={<User size={18} />}
                  value={formData.name}
                  onChange={(v: string) =>
                    setFormData({ ...formData, name: v })
                  }
                  placeholder="Your Name"
                  required
                  error={formData.name && !isNameValid}
                />
                <InputField
                  label="Email Address"
                  icon={<Mail size={18} />}
                  value={formData.email}
                  onChange={(v: string) =>
                    setFormData({ ...formData, email: v })
                  }
                  placeholder="Your Email"
                  required
                  type="email"
                  error={formData.email && !isEmailValid}
                />

                {/* STEP 4: Integrated Phone Input */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      Mobile Number
                    </label>
                  </div>
                  <div className="phone-input-container">
                    <PhoneInput
                      country={"in"}
                      value={formData.mobile}
                      onChange={(phone, data: any) => {
                        const countryCode = data.dialCode;
                        const numberWithoutCode = phone.slice(
                          countryCode.length,
                        );
                        const formattedNumber = `+${countryCode} ${numberWithoutCode}`;

                        setFormData({ ...formData, mobile: formattedNumber });
                      }}
                      placeholder="Enter mobile number"
                      enableSearch={true}
                      prefix="+"
                      specialLabel=""
                    />
                  </div>
                </div>

                <InputField
                  label="Profession"
                  icon={<Briefcase size={18} />}
                  value={formData.profession}
                  onChange={(v: string) =>
                    setFormData({ ...formData, profession: v })
                  }
                  placeholder="e.g. AI Developer"
                />
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-medium text-slate-400">
                  {isModified ? (
                    <span className="flex items-center gap-2 text-blue-600 animate-pulse">
                      <Sparkles size={14} /> You have unsaved changes
                    </span>
                  ) : (
                    "Profile is up to date"
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!canSave}
                  className="w-full md:w-auto min-w-[240px] bg-slate-950 hover:bg-blue-600 text-white py-5 px-10 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-500/30 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Loader2 className="animate-spin" size={22} />
                      </motion.div>
                    ) : status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle size={22} className="text-emerald-400" />
                        <span>Changes Saved</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                      >
                        <Save size={20} />
                        <span>Save Changes</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </main>
  );
}

function InputField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  error = false,
}: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between ml-1">
        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
          {label}
        </label>
        {required && (
          <span className="flex items-center gap-1 text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
            REQUIRED
          </span>
        )}
      </div>
      <div className="relative group">
        <div
          className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none ${error ? "text-red-400" : "text-slate-300 group-focus-within:text-blue-600"}`}
        >
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-slate-50 border rounded-[1.5rem] py-4.5 pl-14 pr-12 outline-none transition-all font-bold text-slate-800 ${
            error
              ? "border-red-200 focus:border-red-400 focus:bg-red-50/30"
              : "border-slate-200 focus:border-blue-400 focus:bg-white"
          }`}
        />
        {error && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-red-400">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
    </div>
  );
}
