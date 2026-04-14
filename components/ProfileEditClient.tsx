"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Camera,
  ShieldCheck,
  Globe,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { CiTwitter } from "react-icons/ci";

export default function ProfileEditClient({ user }: { user: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Jitendra Suthar",
    email: user?.email || "jitendra@example.com",
    bio: user?.bio || "Full-stack Architect & AI Enthusiast",
    website: user?.website || "https://jitendra.dev",
    github: user?.github || "jitendra-suthar",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!", {
        description: "Your changes are now live across ToolsVerse.",
      });
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <main className="min-h-screen bg-[#fafcff] pt-28 pb-20 px-4 md:px-6">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-100/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors mb-4"
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Edit <span className="text-blue-600">Profile</span>
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/10 cursor-pointer active:scale-95 disabled:opacity-70"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Avatar & Quick Info */}
          <motion.div
            // @ts-ignore
            variants={fadeUp as any}
            initial="hidden"
            animate="show"
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-center shadow-sm">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-inner">
                  {formData.name.charAt(0)}
                </div>
                <button className="absolute bottom-1 right-1 p-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 shadow-lg transition-transform hover:scale-110 cursor-pointer">
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {formData.name}
              </h3>
              <p className="text-slate-400 font-medium text-sm mb-6">
                {formData.email}
              </p>

              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={14} /> Verified Architect
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
                Connected Accounts
              </h4>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-emerald-500">
                  Linked
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Edit Form */}
          <motion.div
            // @ts-ignore
            variants={fadeUp as any}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="lg:col-span-8"
          >
            <form
              onSubmit={handleSave}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm space-y-8"
            >
              {/* Personal Info Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-800"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative group opacity-60">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                        size={18}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full bg-slate-100 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 cursor-not-allowed font-bold text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                    Bio / Headline
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 transition-all font-medium text-slate-800"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              {/* Links Section */}
              <div className="pt-8 border-t border-slate-100 space-y-6">
                <h3 className="text-lg font-black text-slate-900">
                  Online Presence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      Website URL
                    </label>
                    <div className="relative group">
                      <Globe
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"
                        size={18}
                      />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-800"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      Twitter Handle
                    </label>
                    <div className="relative group">
                      <CiTwitter
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="@username"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Save Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="md:hidden w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold transition-all disabled:opacity-70"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Update Profile
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
