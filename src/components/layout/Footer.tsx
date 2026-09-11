import React from "react";
import Link from "next/link";
import { Sprout, Heart, ShieldCheck, Truck, Scale, PhoneCall } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Features Value Strip */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Direct Mandi Parity</h4>
              <p className="text-xs text-stone-400">Zero middleman exploitation</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">AI Route Delivery</h4>
              <p className="text-xs text-stone-400">Aggregated cold-chain transit</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Escrow Settlements</h4>
              <p className="text-xs text-stone-400">100% secure direct farmer payouts</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Kisan Helpline</h4>
              <p className="text-xs text-stone-400">Toll-free Vernacular Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Farm<span className="text-emerald-500">Connect</span>
            </span>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
            Empowering 140M+ Indian agrarian producers by bridging farm gates directly to urban
            households, restaurants, and wholesale exporters with intelligent logistics.
          </p>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Built for Smart India Hackathon & Sustainable Agriculture
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wider uppercase">Marketplace</h4>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><Link href="/marketplace?category=vegetables" className="hover:text-emerald-400">Fresh Vegetables</Link></li>
            <li><Link href="/marketplace?category=fruits" className="hover:text-emerald-400">Seasonal Fruits</Link></li>
            <li><Link href="/marketplace?category=grains" className="hover:text-emerald-400">Organic Grains & Pulses</Link></li>
            <li><Link href="/marketplace?category=spices" className="hover:text-emerald-400">Origin Spices</Link></li>
            <li><Link href="/marketplace?organic=true" className="hover:text-emerald-400">Certified Organic</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wider uppercase">Stakeholders</h4>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><Link href="/auth/register" className="hover:text-emerald-400">Farmer & FPO Onboarding</Link></li>
            <li><Link href="/auth/register" className="hover:text-emerald-400">Bulk Buyer Procurement</Link></li>
            <li><Link href="/#mandi-rates" className="hover:text-emerald-400">Live Agmarknet Mandis</Link></li>
            <li><Link href="/dashboard/farmer" className="hover:text-emerald-400">Kisan Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wider uppercase">Platform</h4>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><Link href="/#how-it-works" className="hover:text-emerald-400">AI Route Optimization</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-emerald-400">Demand Forecasting</Link></li>
            <li><Link href="/auth/login" className="hover:text-emerald-400">Sign In</Link></li>
            <li><span className="text-stone-500 text-xs">v1.0.0 (Production Ready)</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>© 2026 FarmConnect Technologies Ltd. All rights reserved.</p>
        <p className="flex items-center mt-2 sm:mt-0">
          Crafted with <Heart className="w-3.5 h-3.5 mx-1 text-emerald-500 fill-emerald-500" /> for Indian Farmers & Consumers
        </p>
      </div>
    </footer>
  );
}

export default Footer;
