"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { NamedCount } from "@/lib/types";
import { ChartReady } from "./ChartReady";

export function AlertsBarChart({ data }: { data: NamedCount[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ChartReady height={260}>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--separator)"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          stroke="var(--muted)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--muted)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <Tooltip
          cursor={{ fill: "var(--surface-tertiary)" }}
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            fontSize: 12,
            color: "var(--foreground)",
          }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={d.value >= max * 0.8 ? "#0b3d91" : "#1868d8"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </ChartReady>
  );
}
