"use client";

import React, { useState } from "react";
import { User, Mail, Phone, ShieldCheck, Check } from "lucide-react";
import { AccountNav } from "@/components/account/AccountNav";
import { useAuth } from "@/lib/store/auth-context";
import { useToast } from "@/lib/store/toast-context";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState(user?.full_name || "Alex Taylor");
  const [email] = useState(user?.email || "alex.taylor@example.com");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 234-5678");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your personal details have been saved successfully.",
      type: "success",
    });
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <AccountNav />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B1739]">Profile Settings</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage your personal information and contact preferences</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs max-w-lg">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Managed via Supabase Auth</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
