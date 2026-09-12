"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Scale, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  ShieldCheck, 
  ClipboardCheck, 
  Building2, 
  Sliders, 
  Sun, 
  Moon, 
  ChevronRight,
  Database,
  History
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode preference
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark") || 
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Type Evaluations", href: "/test-cases", icon: ClipboardCheck },
    { label: "Test Observation Studio", href: "/test-studio", icon: Scale },
    { label: "Instrument Models", href: "/instruments", icon: Sliders },
    { label: "Laboratory & Standards", href: "/laboratory", icon: Building2 },
    { label: "Report Repository", href: "/reports", icon: FileText },
    { label: "OIML Template Engine", href: "/templates", icon: Database },
    { label: "Regulatory Audit Log", href: "/audit", icon: History },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans">
      {/* Left Technical Rail */}
      <aside className="w-64 shrink-0 flex flex-col bg-graphite-950 text-graphite-100 border-r border-graphite-800 z-30 select-none">
        {/* Brand / Legal Metrology Header */}
        <div className="h-16 flex items-center px-4 border-b border-graphite-800 gap-3">
          <div className="w-9 h-9 rounded bg-brass-500 flex items-center justify-center text-white shadow-metro shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm tracking-tight text-white truncate">
              MetroSense R-76
            </span>
            <span className="text-[10px] text-graphite-400 font-mono tracking-wider truncate uppercase">
              DoCA Legal Metrology
            </span>
          </div>
        </div>

        {/* Regulatory Standard Badge */}
        <div className="px-4 py-2.5 bg-graphite-900/80 border-b border-graphite-800/80 flex items-center justify-between text-[11px]">
          <span className="text-graphite-400 font-mono">Standard:</span>
          <span className="text-brass-400 font-mono font-semibold bg-brass-950/60 px-2 py-0.5 rounded border border-brass-800/40">
            OIML R-76-1:2006
          </span>
        </div>

        {/* Navigation Link List */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-brass-500 text-white font-semibold shadow-sm"
                    : "text-graphite-300 hover:bg-graphite-900 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-graphite-400"}`} />
                <span className="truncate">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-75 shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* Multi-tenant Laboratory Footer Info */}
        <div className="p-3 border-t border-graphite-800 bg-graphite-900/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-verified-500 animate-pulse" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-graphite-200 truncate">
                RRSL Bengaluru
              </p>
              <p className="text-[10px] font-mono text-graphite-400 truncate">
                Accred: NABL-CC-2144
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Utility Bar */}
        <header className="h-14 bg-paper dark:bg-graphite-900 border-b border-graphite-200 dark:border-graphite-800 px-6 flex items-center justify-between shrink-0 z-20">
          {/* Active Lab Breadcrumb / Selector */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 text-xs text-graphite-600 dark:text-graphite-300">
              <Building2 className="w-4 h-4 text-brass-600 dark:text-brass-400" />
              <span className="font-medium text-graphite-900 dark:text-graphite-100 hidden sm:inline">
                Regional Reference Standard Laboratory, Bengaluru
              </span>
              <span className="text-graphite-400 dark:text-graphite-600">/</span>
              <span className="font-mono text-xs text-graphite-500">
                Div: Mass & Weighing Metrology
              </span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            {/* System Status Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-verified-50 dark:bg-verified-950/40 text-verified-700 dark:text-verified-300 border border-verified-500/20 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-verified-600" />
              <span>MPE Calc v1.0.0 Verified</span>
            </div>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded border border-graphite-200 dark:border-graphite-800 text-graphite-600 dark:text-graphite-400 hover:bg-graphite-100 dark:hover:bg-graphite-800 transition-colors"
              title={isDarkMode ? "Switch to Light Technical Mode" : "Switch to Dark Bench Mode"}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-brass-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Badge */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-graphite-200 dark:border-graphite-800">
              <div className="w-8 h-8 rounded-full bg-graphite-800 text-brass-400 font-semibold text-xs flex items-center justify-center border border-brass-500/40">
                RV
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-graphite-900 dark:text-graphite-100 leading-tight">
                  Dr. R. Venkatraman
                </span>
                <span className="text-[10px] text-graphite-500 dark:text-graphite-400 font-mono leading-tight">
                  Senior Metrologist / Approver
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Canvas */}
        <main className="flex-1 overflow-y-auto bg-background p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
