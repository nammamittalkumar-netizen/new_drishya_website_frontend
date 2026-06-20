"use client";

import { Card, ListBox, Select } from "@heroui/react";
import {
  LayoutGrid,
  MapPin,
  SlidersHorizontal,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState, type Key, type ReactNode } from "react";
import type { Camera } from "@/lib/types";
import { CameraFeed } from "./CameraFeed";

type StatusFilter = "all" | "online" | "offline";

/** HeroUI Select with a leading icon, used for the live-monitor filters. */
function FilterSelect({
  icon: Icon,
  selectedKey,
  onChange,
  ariaLabel,
  children,
}: {
  icon: LucideIcon;
  selectedKey: string;
  onChange: (key: string) => void;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <Select
      aria-label={ariaLabel}
      selectedKey={selectedKey}
      onSelectionChange={(key: Key | null) => key != null && onChange(String(key))}
      className="w-full sm:w-44"
    >
      <Select.Trigger className="relative h-10 pl-9 font-medium shadow-sm">
        <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>{children}</ListBox>
      </Select.Popover>
    </Select>
  );
}

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
        <div className="flex flex-wrap items-center gap-2.5">
          <FilterSelect
            icon={MapPin}
            selectedKey={zone}
            onChange={setZone}
            ariaLabel="Filter by zone"
          >
            <ListBox.Item id="all">All zones</ListBox.Item>
            {zones.map((z) => (
              <ListBox.Item key={z} id={z}>
                {z}
              </ListBox.Item>
            ))}
          </FilterSelect>
          <FilterSelect
            icon={SlidersHorizontal}
            selectedKey={status}
            onChange={(key) => setStatus(key as StatusFilter)}
            ariaLabel="Filter by status"
          >
            <ListBox.Item id="all">All cameras</ListBox.Item>
            <ListBox.Item id="online">Online only</ListBox.Item>
            <ListBox.Item id="offline">Offline only</ListBox.Item>
          </FilterSelect>
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
