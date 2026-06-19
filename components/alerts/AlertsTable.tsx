"use client";

import { Card, Input } from "@heroui/react";
import { Eye, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertThumb } from "./AlertThumb";
import { SeverityChip, StatusChip } from "@/components/ui/Chips";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";
import type { Alert, AlertStatus, Severity } from "@/lib/types";
import {
  ALL_SEVERITIES,
  ALL_STATUSES,
  detectionMeta,
  formatTime,
  statusMeta,
  severityMeta,
} from "@/lib/ui";

const selectClass =
  "h-9 rounded-lg border border-[var(--border)] bg-[var(--field-background,var(--surface))] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]";

export function AlertsTable({ alerts }: { alerts: Alert[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AlertStatus | "all">("all");
  const [severity, setSeverity] = useState<Severity | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return alerts.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (severity !== "all" && a.severity !== severity) return false;
      if (!q) return true;
      return (
        a.cameraName.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        detectionMeta[a.detection].label.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    });
  }, [alerts, query, status, severity]);

  return (
    <Card>
      {/* Filters */}
      <div className="flex flex-col gap-3 border-b border-[var(--border)] p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by camera, location, type…"
            className="w-full pl-9"
            aria-label="Search alerts"
          />
        </div>
        <select
          className={selectClass}
          value={status}
          onChange={(e) => setStatus(e.target.value as AlertStatus | "all")}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {statusMeta[s].label}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          value={severity}
          onChange={(e) => setSeverity(e.target.value as Severity | "all")}
          aria-label="Filter by severity"
        >
          <option value="all">All severities</option>
          {ALL_SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {severityMeta[s].label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-xs uppercase tracking-wide text-[var(--muted)]">
              <th className="px-4 py-3 font-medium">Snapshot</th>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">Camera</th>
              <th className="px-4 py-3 font-medium">Detection</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium">Confidence</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const Icon = detectionMeta[a.detection].icon;
              return (
                <tr
                  key={a.id}
                  className="border-b border-[var(--separator)] transition-colors last:border-0 hover:bg-[var(--surface-tertiary)]"
                >
                  <td className="px-4 py-3">
                    <AlertThumb alert={a} className="w-16" />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-[var(--muted)]">
                    {formatTime(a.time)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--foreground)]">
                      {a.cameraName}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      {a.location}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                      <Icon className="size-4 text-[var(--muted)]" />
                      {detectionMeta[a.detection].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <SeverityChip severity={a.severity} />
                  </td>
                  <td className="px-4 py-3">
                    <ConfidenceMeter value={a.confidence} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/alerts/${a.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface-secondary)]"
                    >
                      <Eye className="size-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-[var(--muted)]">
            No alerts match your filters.
          </div>
        )}
      </div>

      <div className="border-t border-[var(--border)] px-4 py-3 text-xs text-[var(--muted)]">
        Showing {filtered.length} of {alerts.length} alerts
      </div>
    </Card>
  );
}
