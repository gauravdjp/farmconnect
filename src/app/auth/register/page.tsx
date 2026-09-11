"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, ArrowRight, Wheat, User as UserIcon, Building2, Phone, Mail, Lock, UserCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"farmer" | "consumer" | "buyer">("farmer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload: any = {
        name,
        email,
        phone,
        password,
        role,
      };

      if (role === "farmer") {
        payload.farmDetails = {
          farmName: farmName || `${name}'s Organic Farm`,
          state,
          district: "Nashik",
        };
      } else if (role === "buyer") {
        payload.businessDetails = {
          companyName: companyName || name,
          gstNumber: gstNumber || "27AAAAA0000A1Z5",
        };
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push(role === "farmer" ? "/dashboard/farmer" : "/marketplace");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12 bg-stone-50/50">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-md shadow-emerald-700/20">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Create Your FarmConnect Account
          </h2>
          <p className="text-xs text-stone-500">
            Choose your role to join the direct agricultural marketplace
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole("farmer")}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              role === "farmer"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Wheat className="w-4 h-4 text-emerald-600" />
            <span>🌾 Farmer / FPO</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("consumer")}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              role === "consumer"
                ? "bg-white text-blue-800 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <UserIcon className="w-4 h-4 text-blue-600" />
            <span>🛒 Consumer</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
              role === "buyer"
                ? "bg-white text-amber-800 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>📦 Bulk Buyer</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Full Name / Contact
              </label>
              <div className="relative">
                <UserCheck className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Phone Number (WhatsApp)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@farmconnect.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Set Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Role specific fields */}
          {role === "farmer" && (
            <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Farm / FPO Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Farm or FPO Name (e.g. Sahyadri Organic)"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm"
                />
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>
            </div>
          )}

          {role === "buyer" && (
            <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Business & Procurement Details
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company / Restaurant Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm"
                />
                <input
                  type="text"
                  placeholder="GSTIN (e.g. 27AAAAA0000A1Z5)"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm uppercase"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-700/20 text-sm flex items-center justify-center transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : `Join FarmConnect as ${role.toUpperCase()}`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-bold text-emerald-700 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
