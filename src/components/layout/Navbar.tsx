"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  TrendingUp,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Wheat,
  Building2,
} from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    // Check logged in user
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "POST" });
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    router.refresh();
    window.location.href = "/";
  };

  const handleQuickDemoLogin = async (role: string) => {
    let email = "farmer@farmconnect.in";
    let password = "farmer123";
    if (role === "consumer") {
      email = "consumer@farmconnect.in";
      password = "consumer123";
    } else if (role === "buyer") {
      email = "buyer@farmconnect.in";
      password = "buyer123";
    } else if (role === "admin") {
      email = "admin@farmconnect.in";
      password = "admin123";
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.user) {
        setCurrentUser(data.user);
        setIsUserMenuOpen(false);
        router.refresh();
        if (role === "farmer") router.push("/dashboard/farmer");
        else if (role === "buyer") router.push("/marketplace");
        else if (role === "admin") router.push("/marketplace");
        else router.push("/marketplace");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/10 bg-white/95 backdrop-blur shadow-xs">
      {/* Top Notification / Mandi ticker strip */}
      <div className="bg-emerald-800 text-emerald-50 px-4 py-1.5 text-xs font-medium flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center space-x-3 text-xs">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-700/70 text-emerald-200 border border-emerald-600/50">
            <TrendingUp className="w-3 h-3 mr-1 text-emerald-300" />
            LIVE AGMARKNET
          </span>
          <span>Nashik Red Onion: ₹2,400/qtl (+4.2%)</span>
          <span className="text-emerald-400">•</span>
          <span>Sharbati Wheat: ₹2,850/qtl (+1.5%)</span>
          <span className="text-emerald-400">•</span>
          <span>Guntur Teja Chilli: ₹18,500/qtl (+5.6%)</span>
        </div>
        <div className="hidden md:flex items-center space-x-3 pl-4 text-emerald-200">
          <span className="flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            Direct MSP & Fair Pricing Guaranteed
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-stone-900 flex items-center">
              Farm<span className="text-emerald-600">Connect</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-emerald-700 -mt-1">
              Kisan-to-Kitchen Direct
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-stone-700">
          <Link
            href="/marketplace"
            className="hover:text-emerald-600 transition-colors flex items-center"
          >
            Marketplace
          </Link>
          <Link
            href="/#mandi-rates"
            className="hover:text-emerald-600 transition-colors flex items-center"
          >
            Mandi Rates
          </Link>
          <Link
            href="/#fpo"
            className="hover:text-emerald-600 transition-colors flex items-center"
          >
            FPO Collective
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-emerald-600 transition-colors"
          >
            How It Works
          </Link>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center space-x-3">
          {/* Cart link */}
          <Link
            href="/cart"
            className="relative p-2 text-stone-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </Link>

          {/* User Auth or Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 pl-2 pr-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-full hover:bg-emerald-100 transition-colors text-sm font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                  {currentUser.name.slice(0, 1)}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{currentUser.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-200 text-emerald-800 rounded font-semibold uppercase">
                  {currentUser.role}
                </span>
                <ChevronDown className="w-4 h-4 text-emerald-700" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs text-stone-500">Signed in as</p>
                    <p className="text-sm font-semibold text-stone-900 truncate">{currentUser.email}</p>
                  </div>
                  {currentUser.role === "farmer" && (
                    <Link
                      href="/dashboard/farmer"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                    >
                      🌾 Farmer Dashboard
                    </Link>
                  )}
                  <Link
                    href="/marketplace"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    🛒 Browse Marketplace
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hidden sm:inline-flex items-center text-xs px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50"
                >
                  Demo Switcher
                  <ChevronDown className="w-3.5 h-3.5 ml-1 text-stone-400" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-2 z-50">
                    <p className="text-[11px] font-semibold text-stone-400 px-2 py-1 uppercase tracking-wider">
                      Quick Demo Logins
                    </p>
                    <button
                      onClick={() => handleQuickDemoLogin("farmer")}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-emerald-50 text-stone-700 flex items-center justify-between group"
                    >
                      <span className="font-medium flex items-center">
                        <Wheat className="w-4 h-4 mr-2 text-emerald-600" /> Ramesh (Farmer)
                      </span>
                      <span className="text-[10px] text-stone-400 group-hover:text-emerald-600">Switch</span>
                    </button>
                    <button
                      onClick={() => handleQuickDemoLogin("consumer")}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-emerald-50 text-stone-700 flex items-center justify-between group"
                    >
                      <span className="font-medium flex items-center">
                        <UserIcon className="w-4 h-4 mr-2 text-emerald-600" /> Priya (Consumer)
                      </span>
                      <span className="text-[10px] text-stone-400 group-hover:text-emerald-600">Switch</span>
                    </button>
                    <button
                      onClick={() => handleQuickDemoLogin("buyer")}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-emerald-50 text-stone-700 flex items-center justify-between group"
                    >
                      <span className="font-medium flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-emerald-600" /> FreshBite (Bulk Buyer)
                      </span>
                      <span className="text-[10px] text-stone-400 group-hover:text-emerald-600">Switch</span>
                    </button>
                  </div>
                )}
              </div>

              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-semibold rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm shadow-emerald-700/20 transition-all"
              >
                Join Free
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/marketplace"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-stone-800 hover:text-emerald-600"
          >
            Marketplace
          </Link>
          <Link
            href="/#mandi-rates"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-stone-800 hover:text-emerald-600"
          >
            Mandi Rates
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-stone-800 hover:text-emerald-600"
          >
            How It Works
          </Link>
          <div className="pt-2 border-t border-stone-100 flex flex-col space-y-2">
            <Link
              href="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 border border-emerald-600 text-emerald-700 rounded-lg font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-emerald-600 text-white rounded-lg font-medium"
            >
              Join FarmConnect
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
