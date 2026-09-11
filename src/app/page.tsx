import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sprout,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Truck,
  Users,
  Building2,
  CheckCircle2,
  Zap,
  BarChart3,
  MapPin,
  Leaf,
  Scale,
} from "lucide-react";
import { ProductCard } from "@/components/marketplace/ProductCard";
import { MOCK_PRODUCTS, MOCK_MANDI_PRICES } from "@/data/mockData";

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-stone-50 to-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-semibold">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                <span>Empowering Bharat's Agrarian Future • SIH 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
                Fresh from <span className="text-emerald-600">Bharat's Soil</span>, Directly to Your Doorstep.
              </h1>

              <p className="text-lg text-stone-600 leading-relaxed max-w-2xl">
                FarmConnect removes middlemen who siphon off 40–60% of crop value. We link farmers
                and FPOs directly with households and wholesale buyers, powered by AI demand
                forecasting and smart logistics.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-700/25 transition-all hover:scale-[1.02]"
                >
                  Explore Fresh Produce
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-base border border-stone-300 shadow-xs transition-all hover:scale-[1.02]"
                >
                  🌾 Sell as Farmer / FPO
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700">₹4.8 Cr+</div>
                  <div className="text-xs text-stone-500 font-medium">Direct Farmer Payouts</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-stone-900">12,000+</div>
                  <div className="text-xs text-stone-500 font-medium">FPOs & Farmers</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-stone-900">0%</div>
                  <div className="text-xs text-stone-500 font-medium">Middleman Margin</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80"
                  alt="Indian farmer in mustard field"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

                {/* Floating Overlay Badge 1 */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                        🌾
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">Harpreet Singh (FPO)</div>
                        <div className="text-[11px] text-stone-500">Ludhiana • Sharbati Wheat</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-emerald-700">₹42 / kg</div>
                      <div className="text-[10px] text-stone-400 line-through">Mandi: ₹38 / kg</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Mandi Benchmark Ticker Section */}
      <section id="mandi-rates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Live Government Agmarknet Mandi Feed</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                National Mandi Price Benchmarks
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm">
                Real-time price transparency ensures you always buy and sell at verified fair rates.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Compare produce on market <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Mandi Rates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {MOCK_MANDI_PRICES.map((m) => (
              <div
                key={m.id}
                className="bg-stone-800/80 border border-stone-700/60 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/50 transition-colors"
              >
                <div>
                  <div className="text-xs text-stone-400 truncate">{m.mandi}</div>
                  <div className="font-bold text-sm text-stone-100 mt-0.5 truncate">{m.crop}</div>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <div className="text-base font-extrabold text-emerald-400">
                    ₹{m.modalPrice.toLocaleString()}
                    <span className="text-[10px] text-stone-400 font-normal"> / {m.unit}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      m.trend === "up"
                        ? "bg-emerald-950 text-emerald-300"
                        : m.trend === "down"
                        ? "bg-red-950 text-red-300"
                        : "bg-stone-700 text-stone-300"
                    }`}
                  >
                    {m.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Produce Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">
              Direct from the Field
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Featured Harvests
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Harvested within 24-48 hours and shipped directly from verified producer farms.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            View all produce ({MOCK_PRODUCTS.length}+ items) <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4-Stakeholder Value Proposition */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-600 text-xs font-bold uppercase tracking-wider">
            Ecosystem Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Built for Every Agricultural Stakeholder
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            A cohesive digital ecosystem solving real pain points for farmers, buyers, and consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Farmer Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">🌾 Farmers & FPOs</h3>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                Earn 40–60% higher returns by eliminating commission agents.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                AI price suggestions based on current regional mandi demand.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                Guaranteed escrow payouts upon delivery verification.
              </li>
            </ul>
          </div>

          {/* Consumer Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">🛒 Consumers</h3>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                100% traceable produce knowing the exact farmer and harvest date.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                Better retail prices compared to inflated supermarket tags.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                Flexible scheduled delivery slots and recurring subscription boxes.
              </li>
            </ul>
          </div>

          {/* Bulk Buyer Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">📦 Bulk Buyers & HORECA</h3>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0 mt-0.5" />
                Procure directly in quintals and metric tonnes with volume discounts.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0 mt-0.5" />
                Request for Quotes (RFQ) price negotiation workflow.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mr-2 shrink-0 mt-0.5" />
                GST-compliant automated invoices and recurring contract orders.
              </li>
            </ul>
          </div>

          {/* AI Logistics Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 mb-2">🚚 AI Route Logistics</h3>
            <ul className="space-y-2 text-xs text-stone-600">
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                Vehicle Routing Problem (VRP) algorithm bundles nearby orders.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                Reduces food transit miles by up to 35%, cutting perishable wastage.
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                Regional hub-and-spoke collection points for efficient dispatch.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI Intelligence Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <Zap className="w-3.5 h-3.5" />
                <span>AI-Powered Agricultural Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Predicting Demand Before Seeds Are Sown
              </h2>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Our machine learning models analyze 5+ years of Agmarknet mandi arrivals, regional
                weather patterns, and upcoming festival calendars to provide actionable forecasts.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <div className="text-lg font-bold text-emerald-300">XGBoost & Prophet</div>
                  <div className="text-xs text-stone-300">Demand & Mandi Price Prediction</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <div className="text-lg font-bold text-emerald-300">OR-Tools VRP</div>
                  <div className="text-xs text-stone-300">Multi-Stop Route Optimization</div>
                </div>
              </div>
            </div>

            {/* Visual AI Card */}
            <div className="bg-stone-950/70 border border-emerald-500/30 rounded-2xl p-6 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-stone-200">AI Demand Forecast (Nashik District)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded">
                  94.2% Confidence
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Onion (Nashik Red)</span>
                    <span className="text-emerald-400 font-bold">+28% surge expected</span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[82%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Tomato (Hybrid Desi)</span>
                    <span className="text-amber-400 font-bold">Stable supply (+4%)</span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[54%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-stone-300 mb-1">
                    <span>Grapes (Thompson Seedless)</span>
                    <span className="text-emerald-400 font-bold">+45% export demand</span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[91%] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-stone-400 italic">
                * Dynamic price suggestions automatically guide farmers to price produce fairly without underselling.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-emerald-600 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Transform Agricultural Commerce?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Join thousands of farmers, consumers, and food businesses building a more equitable,
              transparent food system across India.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/auth/register"
                className="px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold rounded-xl shadow-md transition-all hover:scale-105 text-sm"
              >
                Register as Farmer / Buyer
              </Link>
              <Link
                href="/marketplace"
                className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl border border-emerald-500/50 transition-all text-sm"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
