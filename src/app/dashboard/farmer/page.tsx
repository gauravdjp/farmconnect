"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  TrendingUp,
  Package,
  Clock,
  PlusCircle,
  Sparkles,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  IndianRupee,
} from "lucide-react";
import { MOCK_PRODUCTS, MOCK_MANDI_PRICES } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

export default function FarmerDashboard() {
  const [products, setProducts] = useState(MOCK_PRODUCTS.slice(0, 3));
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new produce listing
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("vegetables");
  const [newPrice, setNewPrice] = useState("32");
  const [newUnit, setNewUnit] = useState("kg");
  const [newQty, setNewQty] = useState("1500");
  const [isOrganic, setIsOrganic] = useState(true);
  const [aiPriceNote, setAiPriceNote] = useState("");

  const handleAiPriceSuggestion = () => {
    // Dynamic pricing calculation based on mandi rates + 15% fair trade margin
    if (newName.toLowerCase().includes("onion")) {
      setNewPrice("28");
      setAiPriceNote("AI recommends ₹28/kg (+16% above Lasalgaon Mandi ₹24/kg base).");
    } else if (newName.toLowerCase().includes("wheat")) {
      setNewPrice("42");
      setAiPriceNote("AI recommends ₹42/kg (+10% above Khanna Mandi ₹38/kg benchmark).");
    } else {
      setNewPrice("35");
      setAiPriceNote("AI recommends ₹35/kg based on regional harvest arrival trends.");
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd = {
      id: "prod-" + Date.now(),
      name: newName || "Farm Harvest",
      category: newCategory as any,
      description: `Harvest-fresh ${newName} from Sahyadri Agro Organic Farms. High quality, naturally cultivated.`,
      images: [
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      ],
      pricePerUnit: parseFloat(newPrice) || 30,
      unit: newUnit,
      availableQty: parseFloat(newQty) || 500,
      minOrderQty: 5,
      harvestDate: new Date().toISOString().split("T")[0],
      isOrganic,
      farmerId: "user-farmer-1",
      farmerName: "Ramesh Patel",
      farmerLocation: "Nashik, Maharashtra",
      rating: 5.0,
      mandiBenchmarkPrice: Math.round((parseFloat(newPrice) || 30) * 0.88),
      aiSuggestedPrice: parseFloat(newPrice) || 30,
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    setNewName("");
    setAiPriceNote("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 to-green-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300 mb-1">
            <Sprout className="w-4 h-4" />
            <span>Sahyadri Agro Organic Farms • Nashik, Maharashtra</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kisan Portal — Ramesh Patel
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Godavari Valley FPO Member • Direct marketplace settlements & AI insights
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold rounded-xl shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4 mr-1.5 text-emerald-600" />
            List New Produce
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Settled Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">₹3,42,850</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +42% vs traditional APMC mandi
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">14 Orders</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">
            4 ready for collection hub pickup
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Available Stock</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">5,700 kg</div>
          <div className="text-[11px] text-stone-500 mt-1">Across 3 active produce lots</div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Escrow Balance</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-stone-900">₹48,200</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            Pending delivery OTP confirmation
          </div>
        </div>
      </div>

      {/* Main Content: Produce Listings & AI Demand Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Produce Listings */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">Active Harvest Lots</h2>
            <span className="text-xs text-stone-500">Live in Marketplace</span>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
            {products.map((p) => (
              <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-stone-900 text-base">{p.name}</span>
                    {p.isOrganic && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Organic
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-600 uppercase">
                      {p.category}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 flex items-center space-x-3">
                    <span>Stock: <strong className="text-stone-800">{p.availableQty.toLocaleString()} {p.unit}</strong></span>
                    <span>•</span>
                    <span>Harvest: {p.harvestDate}</span>
                    <span>•</span>
                    <span>Mandi parity: ₹{p.mandiBenchmarkPrice}/{p.unit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-stone-900">
                      {formatCurrency(p.pricePerUnit)} <span className="text-xs font-normal text-stone-500">/{p.unit}</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">Active Listing</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Incoming Orders Strip */}
          <div className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-stone-900">Recent Customer Orders</h2>
            <div className="bg-white rounded-2xl border border-stone-200 p-4 divide-y divide-stone-100 shadow-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">Order #FC-8921 • Priya Sharma</div>
                  <div className="text-[11px] text-stone-500">25 kg Farm-Fresh Red Onions • Koramangala Hub</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700">₹700</div>
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold">
                    Picked Up
                  </span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">Order #FC-8840 • FreshBite Foods (Bulk)</div>
                  <div className="text-[11px] text-stone-500">500 kg Golden Sharbati Wheat • Mumbai Central Hub</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700">₹21,000</div>
                  <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                    Ready for Transit
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: AI Demand Forecasting & Mandi Insights */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Intelligence Card */}
          <div className="bg-gradient-to-br from-emerald-950 to-stone-900 rounded-2xl p-5 text-white shadow-md space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>AI Crop Demand Predictor</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Based on upcoming Navratri and Diwali festival periods in Western India:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-white/10 rounded-xl">
                <div className="font-bold text-emerald-300">Garwa Red Onions</div>
                <div className="text-stone-300 text-[11px] mt-0.5">High demand surge expected in 14 days (+30% price potential). Recommended: Hold 40% stock.</div>
              </div>

              <div className="p-2.5 bg-white/10 rounded-xl">
                <div className="font-bold text-amber-300">Desi Hybrid Tomatoes</div>
                <div className="text-stone-300 text-[11px] mt-0.5">Supply peak in neighboring districts. Sell current harvest immediately to avoid softening.</div>
              </div>
            </div>
          </div>

          {/* Mandi Benchmark Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-800">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Live Lasalgaon APMC Benchmark</span>
              </div>
              <span className="text-[10px] text-stone-400">Today</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-600">Onion (Modal)</span>
                <span className="font-bold text-stone-900">₹2,400 / quintal</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-600">Tomato (Modal)</span>
                <span className="font-bold text-stone-900">₹1,800 / quintal</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Grapes (Export grade)</span>
                <span className="font-bold text-stone-900">₹7,200 / quintal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Produce Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-lg text-stone-900">List Produce on Marketplace</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Produce Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nashik Red Onions (Grade A)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm bg-stone-50"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="grains">Grains</option>
                    <option value="spices">Spices</option>
                    <option value="dairy">Dairy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Available Quantity</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={newQty}
                    onChange={(e) => setNewQty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"
                  />
                </div>
              </div>

              {/* Price & AI Suggestion Row */}
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-emerald-900 uppercase">
                    Your Price per {newUnit} (₹)
                  </label>
                  <button
                    type="button"
                    onClick={handleAiPriceSuggestion}
                    className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-xs"
                  >
                    <Sparkles className="w-3 h-3 mr-1 text-emerald-600" />
                    AI Price Suggestion
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-stone-700">₹</span>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white font-bold"
                  />
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="quintal">quintal</option>
                    <option value="dozen">dozen</option>
                  </select>
                </div>

                {aiPriceNote && (
                  <p className="text-[11px] text-emerald-800 font-medium">✨ {aiPriceNote}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="organic"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="organic" className="text-xs font-medium text-stone-700">
                  Certified Organic / Residue Free Harvest
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
                >
                  Publish Produce Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
