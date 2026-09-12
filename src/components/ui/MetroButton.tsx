"use client";

import React from "react";

export interface MetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "verified";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const MetroButton: React.FC<MetroButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-sm focus:outline-none focus:ring-2 focus:ring-brass-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-sm px-3.5 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5",
  }[size];

  const variantStyles = {
    primary: "bg-brass-500 hover:bg-brass-600 active:bg-brass-700 text-white shadow-metro border border-brass-600",
    secondary: "bg-paper dark:bg-graphite-900 hover:bg-graphite-100 dark:hover:bg-graphite-800 text-graphite-800 dark:text-graphite-100 border border-graphite-300 dark:border-graphite-700 shadow-metro",
    danger: "bg-fail-600 hover:bg-fail-700 active:bg-fail-800 text-white shadow-metro border border-fail-700",
    ghost: "bg-transparent hover:bg-graphite-100 dark:hover:bg-graphite-800 text-graphite-700 dark:text-graphite-300",
    verified: "bg-verified-600 hover:bg-verified-700 active:bg-verified-800 text-white shadow-metro border border-verified-700",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
