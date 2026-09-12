"use client";

import React from "react";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  isMono?: boolean;
  width?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No observation readings recorded yet.",
  className = "",
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto border border-graphite-200 dark:border-graphite-800 rounded-sm bg-paper dark:bg-graphite-900 shadow-metro ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-graphite-100/70 dark:bg-graphite-950/80 border-b border-graphite-200 dark:border-graphite-800 text-graphite-600 dark:text-graphite-400 font-semibold tracking-wider uppercase">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={`py-2.5 px-3 ${
                  col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-graphite-200 dark:divide-graphite-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-graphite-500 italic">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={keyExtractor(item, index)}
                className="hover:bg-graphite-50 dark:hover:bg-graphite-800/40 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`py-2 px-3 text-graphite-800 dark:text-graphite-200 ${
                      col.isMono ? "font-mono font-medium text-graphite-900 dark:text-graphite-100" : "font-sans"
                    } ${
                      col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {col.render ? col.render(item, index) : ((item as Record<string, unknown>)[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
