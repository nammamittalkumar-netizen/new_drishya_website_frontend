"use client";

import { Card } from "@heroui/react";
import { LayoutGrid, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Camera } from "@/lib/types";
import { CameraFeed } from "./CameraFeed";

type StatusFilter = "all" | "online" | "offline";

const selectClass =
  "h-9 rounded-lg border border-[var(--border)] bg-[var(--field-background,var(--surface))] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]";

export function LiveMonitor({ cameras }: { cameras: Camera[] }) {
  const [zone, setZone] = useState("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [cols, setCols] = useState(3);
  const [expanded, setExpanded] = useState<Camera | null>(null);

  const zones = useMemo(
    () => Array.from(new Set(cameras.map((c) => c.zone))),
    [cameras],
  );

  const filtered = cameras.filter((c) => {
    if (zone !== "all" && c.zone !== zone) return false;
    if (status !== "all" && c.status !== status) return false;
    return true;
  });

  const gridCols =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <>
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <select
            className={selectClass}
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            aria-label="Filter by zone"
          >
            <option value="all">All zones</option>
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
          <select
            className={selectClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            aria-label="Filter by status"
          >
            <option value="all">All cameras</option>
            <option value="online">Online only</option>
            <option value="offline">Offline only</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <LayoutGrid className="size-4 text-[var(--muted)]" />
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCols(n)}
              aria-pressed={cols === n}
              className={[
                "size-8 rounded-lg border text-sm font-medium transition-colors",
                cols === n
                  ? "border-[var(--accent)] bg-[var(--drishya-brand-blue-light)] text-[var(--accent)] dark:bg-[color-mix(in_oklab,var(--accent)_22%,transparent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]",
              ].join(" ")}
            >
              {n}
            </button>
          ))}
        </div>
      </Card>

      <div className={`grid grid-cols-1 gap-3 ${gridCols}`}>
        {filtered.map((cam) => (
          <CameraFeed
            key={cam.id}
            camera={cam}
            onExpand={() => setExpanded(cam)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="px-4 py-16 text-center text-sm text-[var(--muted)]">
          No cameras match your filters.
        </Card>
      )}

      {/* Fullscreen */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl">
            <div className="mb-3 flex items-center justify-between text-white">
              <p className="font-semibold">
                {expanded.name} · {expanded.location}
              </p>
              <button
                type="button"
                aria-label="Close fullscreen"
                onClick={() => setExpanded(null)}
                className="grid size-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
            </div>
            <CameraFeed camera={expanded} />
          </div>
        </div>
      )}
    </>
  );
}
