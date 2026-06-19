import type { Alert } from "@/lib/types";
import { detectionMeta } from "@/lib/ui";

function color(alert: Alert): string {
  if (alert.severity === "critical" || alert.severity === "high")
    return "#f87171";
  if (alert.severity === "medium") return "#fbbf24";
  return "#60a5fa";
}

/**
 * Snapshot-style thumbnail for an alert — a faux CCTV frame with the detection
 * framed by a severity-colored bounding box. Swap for a real snapshot image
 * (`alert.snapshot`) when the backend provides one.
 */
export function AlertThumb({
  alert,
  className = "",
}: {
  alert: Alert;
  className?: string;
}) {
  const Icon = detectionMeta[alert.detection].icon;
  const c = color(alert);

  return (
    <div
      className={`relative aspect-video shrink-0 overflow-hidden rounded-md bg-[#0a0f1c] ring-1 ring-black/40 ${className}`}
    >
      <div className="absolute inset-0 drishya-grid-bg opacity-50" />
      <div className="absolute inset-0 scanline opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {/* REC dot */}
      <span className="absolute left-1 top-1 size-1.5 rounded-full bg-red-500 live-dot" />

      {/* Detection bounding box */}
      <div
        className="absolute inset-[26%] grid place-items-center rounded-[2px] border-2"
        style={{ borderColor: c }}
      >
        <Icon className="size-4" style={{ color: c }} />
      </div>

      <span className="absolute bottom-0.5 right-1 font-mono text-[8px] text-slate-300">
        {alert.confidence}%
      </span>
    </div>
  );
}
