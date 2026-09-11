"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, ArrowRight, Wheat, User as UserIcon, Building2, Shield, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(data.user?.role === "farmer" ? "/dashboard/farmer" : "/marketplace");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (type: "farmer" | "consumer" | "buyer" | "admin") => {
    if (type === "farmer") {
      setEmail("farmer@farmconnect.in");
      setPassword("farmer123");
    } else if (type === "consumer") {
      setEmail("consumer@farmconnect.in");
      setPassword("consumer123");
    } else if (type === "buyer") {
      setEmail("buyer@farmconnect.in");
      setPassword("buyer123");
    } else {
      setEmail("admin@farmconnect.in");
      setPassword("admin123");
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12 bg-stone-50/50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-md shadow-emerald-700/20">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Sign In to FarmConnect
          </h2>
          <p className="text-xs text-stone-500">
            Direct farmer-to-consumer digital marketplace access
          </p>
        </div>

        {/* Quick Demo Credentials Picker */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-between">
            <span>⚡ Instant Demo Logins (SIH / Review)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill("farmer")}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-emerald-100/60 border border-emerald-200 text-xs font-semibold text-stone-800 flex items-center transition-colors"
            >
              <Wheat className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              Farmer
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("consumer")}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-emerald-100/60 border border-emerald-200 text-xs font-semibold text-stone-800 flex items-center transition-colors"
            >
              <UserIcon className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Consumer
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("buyer")}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-emerald-100/60 border border-emerald-200 text-xs font-semibold text-stone-800 flex items-center transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              Bulk Buyer
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-emerald-100/60 border border-emerald-200 text-xs font-semibold text-stone-800 flex items-center transition-colors"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5 text-stone-700" />
              Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="name@farmconnect.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-700/20 text-sm flex items-center justify-center transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/register" className="font-bold text-emerald-700 hover:underline">
            Register free
          </Link>
        </div>
      </div>
    </div>
  );
}
