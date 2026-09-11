"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Leaf, Sparkles, Sprout } from "lucide-react";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { MOCK_PRODUCTS } from "@/data/mockData";

const CATEGORIES = [
  { id: "all", label: "All Harvests" },
  { id: "vegetables", label: "Vegetables" },
  { id: "grains", label: "Grains & Pulses" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy & Ghee" },
  { id: "spices", label: "Spices" },
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch from API or fallback
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (searchQuery) params.set("search", searchQuery);
    if (organicOnly) params.set("organic", "true");

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.products) {
          setProducts(data.products);
        }
      })
      .catch(() => {
        // Mock filter fallback
        let filtered = [...MOCK_PRODUCTS];
        if (selectedCategory !== "all") {
          filtered = filtered.filter((p) => p.category === selectedCategory);
        }
        if (organicOnly) {
          filtered = filtered.filter((p) => p.isOrganic);
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.farmerName.toLowerCase().includes(q)
          );
        }
        setProducts(filtered);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery, organicOnly]);

  // Apply sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.pricePerUnit - b.pricePerUnit;
    if (sortBy === "price-desc") return b.pricePerUnit - a.pricePerUnit;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0; // default
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold">
            <Sprout className="w-3.5 h-3.5" />
            <span>Farm Gate Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Direct Agrarian Produce Marketplace
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Every product is listed directly by verified farmers and FPOs. Zero middleman cuts,
            transparent origin details, and quality benchmarked against mandi indices.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Search & Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search onions, sharbati wheat, tomatoes, farmers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-sm placeholder:text-stone-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            {/* Organic Toggle */}
            <button
              onClick={() => setOrganicOnly(!organicOnly)}
              className={`flex items-center px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors border ${
                organicOnly
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200"
              }`}
            >
              <Leaf className="w-3.5 h-3.5 mr-1.5" />
              Certified Organic
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-stone-100 hover:bg-stone-200/70 text-stone-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Produce Grid */}
      {loading ? (
        <div className="py-16 text-center text-stone-400">
          <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm">Loading harvest-fresh produce...</p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Sprout className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-800">No produce matches your filters</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search term or switching to "All Harvests" to see all available lots.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setOrganicOnly(false);
            }}
            className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id || (p as any)._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
