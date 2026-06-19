"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders chart children only after mount. Recharts' ResponsiveContainer
 * cannot measure its parent during SSR/prerender (it logs a width(-1)/
 * height(-1) warning); gating on mount avoids that and guarantees a correct
 * first measurement on the client.
 */
export function ChartReady({
  height,
  children,
}: {
  height: number;
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!ready) {
    return (
      <div
        style={{ height }}
        className="w-full animate-pulse rounded-lg bg-[var(--surface-tertiary)]"
        aria-hidden
      />
    );
  }
  return <>{children}</>;
}
