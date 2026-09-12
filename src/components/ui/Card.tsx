"use client";

import React from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = "",
  accent = false,
}) => {
  return (
    <div
      className={`relative bg-paper dark:bg-graphite-900 border border-graphite-200 dark:border-graphite-800 rounded-sm shadow-metro overflow-hidden ${className}`}
    >
      {accent && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-brass-500" />
      )}

      {(title || action) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-graphite-200 dark:border-graphite-800 bg-graphite-50/50 dark:bg-graphite-950/40">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-graphite-900 dark:text-graphite-100 tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-graphite-500 dark:text-graphite-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className="p-4">{children}</div>
    </div>
  );
};
