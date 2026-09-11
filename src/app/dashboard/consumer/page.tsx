"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  ArrowRight,
  Sparkles,
  Heart,
  Calendar,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ConsumerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
            Consumer Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-0.5">
            Welcome back, Priya Sharma
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-blue-300" />
            Koramangala, Bengaluru • Connected to 6 local regional hubs
          </p>
        </div>

        <Link
          href="/marketplace"
          className="inline-flex items-center px-4 py-2.5 bg-white text-blue-900 font-bold rounded-xl text-xs hover:bg-blue-50 transition-all shadow-md self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4 mr-1.5 text-blue-600" />
          Order Fresh Harvest
        </Link>
      </div>

      {/* Active Delivery Tracking Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold uppercase tracking-wider mb-1">
              🚚 In Transit (AI Optimized Route)
            </span>
            <h2 className="text-lg font-bold text-stone-900">Order #FC-8921</h2>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-stone-500">Estimated Delivery Window</div>
            <div className="text-sm font-extrabold text-stone-900">Today, 9:30 AM - 11:00 AM</div>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            <span className="text-emerald-700">Harvested</span>
            <span className="text-emerald-700">Hub Sorted</span>
            <span className="text-blue-700">Out for Delivery</span>
            <span className="text-stone-400">Doorstep OTP</span>
          </div>
          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden flex">
            <div className="bg-emerald-500 w-1/4"></div>
            <div className="bg-emerald-500 w-1/4"></div>
            <div className="bg-blue-600 w-1/4 animate-pulse"></div>
            <div className="bg-transparent w-1/4"></div>
          </div>
        </div>

        {/* Order item details */}
        <div className="p-4 bg-stone-50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
              🌾
            </div>
            <div>
              <div className="font-bold text-stone-900">25 kg Farm-Fresh Red Onions (Garwa)</div>
              <div className="text-stone-500">Farmer: Ramesh Patel (Nashik, Maharashtra)</div>
            </div>
          </div>
          <div className="text-right font-bold text-stone-900 sm:self-center">
            {formatCurrency(700)} • <span className="text-emerald-600 font-semibold">Escrow Secured</span>
          </div>
        </div>
      </div>

      {/* Grid: Preferred Farmers & Subscriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preferred Farmers */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 flex items-center text-sm">
              <Heart className="w-4 h-4 mr-1.5 text-red-500 fill-red-500" />
              Your Favorite Farmers & FPOs
            </h3>
            <span className="text-xs text-stone-400">Direct Links</span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900">Ramesh Patel (Sahyadri Agro)</div>
                <div className="text-stone-500">Nashik • Onions, Tomatoes, Grapes</div>
              </div>
              <Link
                href="/marketplace"
                className="px-3 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-bold"
              >
                View Produce
              </Link>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-stone-900">Harpreet Singh (Green Harvest FPO)</div>
                <div className="text-stone-500">Ludhiana • Sharbati Wheat, Basmati</div>
              </div>
              <Link
                href="/marketplace"
                className="px-3 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg font-bold"
              >
                View Produce
              </Link>
            </div>
          </div>
        </div>

        {/* Weekly Farm Box Subscription */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>FarmConnect Fresh Box</span>
          </div>
          <h3 className="font-extrabold text-stone-900 text-base">Weekly Organic Essentials Box</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Curated assortment of 8 seasonal kitchen vegetables + 2 seasonal fruits harvested on Sunday morning and delivered to your doorstep every Monday.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <div className="text-sm font-extrabold text-emerald-800">₹499 / week</div>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs">
              Subscribe Box
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
