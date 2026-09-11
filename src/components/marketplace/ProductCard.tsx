"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  MapPin,
  ShoppingBag,
  Leaf,
  Check,
  TrendingDown,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id?: string;
    _id?: string;
    name: string;
    category: string;
    description: string;
    images: string[];
    pricePerUnit: number;
    unit: string;
    availableQty: number;
    minOrderQty?: number;
    isOrganic?: boolean;
    farmerName?: string;
    farmerLocation?: string;
    rating?: number;
    mandiBenchmarkPrice?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const id = product.id || product._id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80";

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isOrganic && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white backdrop-blur-xs shadow-sm">
                <Leaf className="w-3 h-3 mr-1" />
                Organic
              </span>
            )}
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider bg-white/90 text-stone-700 backdrop-blur-xs shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-xs font-semibold flex items-center shadow">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
            {product.rating ? product.rating.toFixed(1) : "4.9"}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Farmer information */}
          <div className="flex items-center text-xs text-stone-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" />
            <span className="truncate">{product.farmerLocation || "Maharashtra"}</span>
            <span className="mx-1.5">•</span>
            <span className="text-stone-700 font-medium truncate flex items-center">
              {product.farmerName || "Farmer Producer Org"}
              <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-1 inline" />
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-stone-500 text-xs line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          {/* Mandi Parity Comparison Tag */}
          {product.mandiBenchmarkPrice && (
            <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-lg px-2.5 py-1 mb-3 text-[11px] text-emerald-800 flex items-center justify-between">
              <span className="flex items-center font-medium">
                <TrendingDown className="w-3 h-3 mr-1 text-emerald-600" />
                Mandi Avg: ₹{product.mandiBenchmarkPrice}/{product.unit}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 uppercase">
                Direct Pricing
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Price & CTA */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-stone-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-stone-400 block font-medium">Farmer Price</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-xl font-extrabold text-stone-900">
              {formatCurrency(product.pricePerUnit)}
            </span>
            <span className="text-xs text-stone-500">/ {product.unit}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            added
              ? "bg-emerald-700 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-700/25"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 mr-1.5" /> Added!
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 mr-1.5" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
