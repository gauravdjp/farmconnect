"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShieldCheck, ArrowRight, Truck, Clock, CheckCircle2, Sprout } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: "cart-1",
      name: "Farm-Fresh Red Onions (Garwa)",
      farmerName: "Ramesh Patel",
      location: "Nashik, Maharashtra",
      pricePerUnit: 28,
      unit: "kg",
      quantity: 10,
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "cart-2",
      name: "Golden Sharbati Wheat (Unpolished)",
      farmerName: "Harpreet Singh",
      location: "Ludhiana, Punjab",
      pricePerUnit: 42,
      unit: "kg",
      quantity: 20,
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    },
  ]);

  const [deliverySlot, setDeliverySlot] = useState("morning");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
  const deliveryFee = 40;
  const platformFee = 10;
  const total = subtotal + deliveryFee + platformFee;

  const handleUpdateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as any
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderSuccess(true);
      setItems([]);
    }, 1200);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900">Order Placed Successfully!</h1>
        <p className="text-stone-600 text-sm max-w-md mx-auto">
          Order <strong>#FC-9241</strong> has been dispatched to Ramesh Patel & Harpreet Singh.
          Payment of <strong>{formatCurrency(total)}</strong> is held in FarmConnect Escrow until delivery OTP verification.
        </p>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-center space-x-2">
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>AI Delivery Route Optimized • Estimated Arrival: Tomorrow, 8:00 AM - 11:00 AM</span>
        </div>

        <div className="pt-4 flex justify-center space-x-3">
          <Link
            href="/marketplace"
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-emerald-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Shopping Cart</h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Direct farm-gate checkout with aggregated delivery
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-stone-800">Your basket is empty</h2>
          <p className="text-xs text-stone-500">Explore fresh harvests straight from local farmers.</p>
          <Link
            href="/marketplace"
            className="inline-block px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700"
          >
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-xs">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-sm font-bold text-stone-900 truncate">{item.name}</h3>
                    <p className="text-xs text-stone-500 truncate">
                      Farmer: <span className="font-semibold text-stone-700">{item.farmerName}</span> ({item.location})
                    </p>
                    <div className="text-xs font-extrabold text-emerald-700">
                      {formatCurrency(item.pricePerUnit)} / {item.unit}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-sm font-bold text-stone-600 hover:bg-stone-50"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-sm font-bold text-stone-600 hover:bg-stone-50"
                    >
                      +
                    </button>
                  </div>

                  {/* Total & Delete */}
                  <div className="text-right pl-2">
                    <div className="text-sm font-black text-stone-900">
                      {formatCurrency(item.pricePerUnit * item.quantity)}
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Slot Selection */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Preferred Delivery Slot</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliverySlot("morning")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    deliverySlot === "morning"
                      ? "border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold"
                      : "border-stone-200 hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  <div className="font-bold">🌅 Morning Fresh Window</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Tomorrow, 7:00 AM – 11:00 AM</div>
                </button>

                <button
                  onClick={() => setDeliverySlot("evening")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    deliverySlot === "evening"
                      ? "border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold"
                      : "border-stone-200 hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  <div className="font-bold">🌆 Evening Harvest Window</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Tomorrow, 4:00 PM – 8:00 PM</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
              <h2 className="font-bold text-stone-900 text-base border-b border-stone-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Produce Subtotal</span>
                  <span className="font-bold text-stone-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Route Aggregated Delivery</span>
                  <span className="font-bold text-stone-900">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform & Quality Assurance Fee</span>
                  <span className="font-bold text-stone-900">{formatCurrency(platformFee)}</span>
                </div>
                <div className="border-t border-stone-100 pt-2 flex justify-between text-sm font-extrabold text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-emerald-700">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                <div className="flex items-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                  FarmConnect Escrow Guarantee
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Your payment is safely held until you verify produce freshness via 4-digit OTP at your doorstep.
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md text-sm flex items-center justify-center transition-all disabled:opacity-50"
              >
                {loading ? "Securing Escrow..." : "Place Order via Razorpay / Escrow"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
