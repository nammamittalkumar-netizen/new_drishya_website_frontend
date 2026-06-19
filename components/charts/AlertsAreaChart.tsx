"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimePoint } from "@/lib/types";
import { ChartReady } from "./ChartReady";

export function AlertsAreaChart({ data }: { data: TimePoint[] }) {
  return (
    <ChartReady height={240}>
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="alertsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1868d8" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#1868d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="criticalFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--separator)"
          vertical={false}
        />
        <XAxis
          dataKey="label"
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
          contentStyle={{
            background: "var(--overlay, var(--surface))",
            border: "1px solid var(--border)",
            borderRadius: 10,
            fontSize: 12,
            color: "var(--foreground)",
          }}
        />
        <Area
          type="monotone"
          dataKey="alerts"
          name="All alerts"
          stroke="#1868d8"
          strokeWidth={2}
          fill="url(#alertsFill)"
        />
        <Area
          type="monotone"
          dataKey="critical"
          name="Critical"
          stroke="#ef4444"
          strokeWidth={2}
          fill="url(#criticalFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
    </ChartReady>
  );
}
