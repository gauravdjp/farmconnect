"use client";

import React, { useState } from "react";
import { 
  History, 
  ShieldCheck, 
  Search, 
  Filter, 
  Lock, 
  User, 
  FileCheck2, 
  Clock 
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getAuditLogs } from "@/lib/db/metrology-db";

export default function AuditLogPage() {
  const [logs] = useState(getAuditLogs());
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter((l) => 
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.actor_name?.toLowerCase().includes(search.toLowerCase()) ||
    l.entity_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-graphite-950 dark:text-graphite-50 tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-brass-500" />
            <span>Regulatory Metrology Audit Trail</span>
          </h1>
          <p className="text-xs text-graphite-500 dark:text-graphite-400 mt-0.5">
            Append-only, legally defensible record of all observations, calculations, approvals, and system mutations under Legal Metrology Act, 2009.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-verified-50 dark:bg-verified-950/40 text-verified-700 dark:text-verified-300 border border-verified-500/30 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-verified-600" />
          <span>Immutable Audit Log Active</span>
        </div>
      </div>

      {/* Search & Filter */}
      <Card>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-graphite-400" />
          <input
            type="text"
            placeholder="Search audit trail by actor name, action verb, or entity ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-paper dark:bg-graphite-900 border border-graphite-300 dark:border-graphite-700 pl-9 pr-3 py-1.5 text-xs text-graphite-900 dark:text-graphite-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-brass-500"
          />
        </div>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-graphite-200 dark:border-graphite-800 text-graphite-500 uppercase font-semibold text-[11px] bg-graphite-50 dark:bg-graphite-950/60">
                <th className="py-2.5 px-3">Timestamp (IST)</th>
                <th className="py-2.5 px-3">Metrologist / Actor</th>
                <th className="py-2.5 px-3">Authorized Role</th>
                <th className="py-2.5 px-3">Action Executed</th>
                <th className="py-2.5 px-3">Entity Reference</th>
                <th className="py-2.5 px-3">Client IP</th>
                <th className="py-2.5 px-3 text-center">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-200 dark:divide-graphite-800 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-graphite-50 dark:hover:bg-graphite-800/40 transition-colors">
                  <td className="py-3 px-3 text-graphite-600 dark:text-graphite-400">
                    {new Date(log.created_at).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "medium",
                    })}
                  </td>
                  <td className="py-3 px-3 font-sans font-semibold text-graphite-900 dark:text-graphite-100">
                    {log.actor_name}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-graphite-100 dark:bg-graphite-800 text-graphite-700 dark:text-graphite-300 font-bold">
                      {log.actor_role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-brass-700 dark:text-brass-400">
                    {log.action}
                  </td>
                  <td className="py-3 px-3 text-graphite-600 dark:text-graphite-400">
                    {log.entity_type} ({log.entity_id})
                  </td>
                  <td className="py-3 px-3 text-graphite-500">
                    {log.ip_address}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-verified-700 dark:text-verified-300 bg-verified-50 dark:bg-verified-950/50 px-2 py-0.5 rounded border border-verified-500/30">
                      <Lock className="w-2.5 h-2.5" /> Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
