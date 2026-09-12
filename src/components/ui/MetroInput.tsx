"use client";

import React, { forwardRef } from "react";

export interface MetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
  clauseRef?: string;
  error?: string;
  helperText?: string;
  isMono?: boolean;
}

export const MetroInput = forwardRef<HTMLInputElement, MetroInputProps>(({
  label,
  unit,
  clauseRef,
  error,
  helperText,
  isMono = true,
  className = "",
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1 w-full">
      {(label || clauseRef) && (
        <div className="flex items-baseline justify-between">
          {label && (
            <label htmlFor={inputId} className="text-xs font-semibold text-graphite-700 dark:text-graphite-300">
              {label}
            </label>
          )}
          {clauseRef && (
            <span className="text-[10px] font-mono text-graphite-500 dark:text-graphite-400 bg-graphite-100 dark:bg-graphite-800 px-1.5 py-0.5 rounded">
              {clauseRef}
            </span>
          )}
        </div>
      )}

      <div className="relative flex items-center">
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-paper dark:bg-graphite-900 border rounded-sm px-3 py-2 text-sm text-graphite-900 dark:text-graphite-100 transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-brass-500 disabled:opacity-50 disabled:bg-graphite-100 dark:disabled:bg-graphite-950 ${
            isMono ? "font-mono font-medium" : "font-sans"
          } ${
            error
              ? "border-fail-500 focus:border-fail-500 focus:ring-fail-500"
              : "border-graphite-300 dark:border-graphite-700 focus:border-brass-500"
          } ${unit ? "pr-12" : ""} ${className}`}
          {...props}
        />

        {unit && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none text-xs font-mono text-graphite-500 dark:text-graphite-400 border-l border-graphite-200 dark:border-graphite-800 my-1 pl-2">
            {unit}
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs text-fail-600 dark:text-fail-400 flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}

      {!error && helperText && (
        <span className="text-[11px] text-graphite-500 dark:text-graphite-400 mt-0.5">
          {helperText}
        </span>
      )}
    </div>
  );
});

MetroInput.displayName = "MetroInput";
