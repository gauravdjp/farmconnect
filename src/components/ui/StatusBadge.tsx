"use client";

import React from "react";

export type MetrologyStatus = 
  | "PASS" 
  | "FAIL" 
  | "TOLERANCE_WARNING" 
  | "DRAFT" 
  | "IN_PROGRESS" 
  | "REVIEW" 
  | "APPROVED" 
  | "SUPERSEDED";

interface StatusBadgeProps {
  status: MetrologyStatus;
  label?: string;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = "md",
}) => {
  const styles: Record<MetrologyStatus, { bg: string; text: string; border: string; dot: string; defaultLabel: string }> = {
    PASS: {
      bg: "bg-verified-50 dark:bg-verified-900/30",
      text: "text-verified-700 dark:text-verified-300",
      border: "border-verified-500/40",
      dot: "bg-verified-600",
      defaultLabel: "COMPLIANT / PASS",
    },
    FAIL: {
      bg: "bg-fail-50 dark:bg-fail-900/30",
      text: "text-fail-700 dark:text-fail-300",
      border: "border-fail-500/40",
      dot: "bg-fail-600",
      defaultLabel: "NON-COMPLIANT / FAIL",
    },
    TOLERANCE_WARNING: {
      bg: "bg-tolerance-50 dark:bg-tolerance-900/30",
      text: "text-tolerance-700 dark:text-tolerance-300",
      border: "border-tolerance-500/40",
      dot: "bg-tolerance-600",
      defaultLabel: "NEAR LIMIT",
    },
    DRAFT: {
      bg: "bg-graphite-100 dark:bg-graphite-800",
      text: "text-graphite-700 dark:text-graphite-300",
      border: "border-graphite-300 dark:border-graphite-700",
      dot: "bg-graphite-500",
      defaultLabel: "DRAFT",
    },
    IN_PROGRESS: {
      bg: "bg-brass-50 dark:bg-brass-900/30",
      text: "text-brass-800 dark:text-brass-300",
      border: "border-brass-500/40",
      dot: "bg-brass-500",
      defaultLabel: "TESTING IN PROGRESS",
    },
    REVIEW: {
      bg: "bg-purple-50 dark:bg-purple-950/30",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-300 dark:border-purple-800",
      dot: "bg-purple-600",
      defaultLabel: "AWAITING REVIEW",
    },
    APPROVED: {
      bg: "bg-verified-100 dark:bg-verified-950/40",
      text: "text-verified-800 dark:text-verified-200",
      border: "border-verified-600/50",
      dot: "bg-verified-600",
      defaultLabel: "APPROVED & CERTIFIED",
    },
    SUPERSEDED: {
      bg: "bg-graphite-200 dark:bg-graphite-800",
      text: "text-graphite-500 dark:text-graphite-400 line-through",
      border: "border-graphite-400 dark:border-graphite-600",
      dot: "bg-graphite-400",
      defaultLabel: "SUPERSEDED",
    },
  };

  const current = styles[status] || styles.DRAFT;
  const padding = size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold tracking-wider uppercase rounded-sm border ${current.bg} ${current.text} ${current.border} ${padding}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} />
      {label || current.defaultLabel}
    </span>
  );
};
