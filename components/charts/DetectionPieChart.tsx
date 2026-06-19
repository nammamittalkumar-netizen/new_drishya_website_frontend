"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { NamedCount } from "@/lib/types";
import { ChartReady } from "./ChartReady";

const COLORS = [
  "#1868d8",
  "#0b3d91",
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#7c3aed",
];

export function DetectionPieChart({ data }: { data: NamedCount[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-[180px] w-[180px] shrink-0">
        <ChartReady height={180}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontSize: 12,
                color: "var(--foreground)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        </ChartReady>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[var(--foreground)]">
            {total}
          </span>
          <span className="text-xs text-[var(--muted)]">detections</span>
        </div>
      </div>
      <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2 text-sm">
            <span
              className="size-2.5 rounded-full"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className="flex-1 text-[var(--muted)]">{d.name}</span>
            <span className="font-semibold text-[var(--foreground)]">
              {d.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
