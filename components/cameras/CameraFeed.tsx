import { Camera as CameraIcon, Maximize2, VideoOff, Wifi } from "lucide-react";
import type { Camera } from "@/lib/types";
import { detectionMeta } from "@/lib/ui";

/**
 * Placeholder video surface. The feed area is intentionally dark (like a real
 * CCTV stream) regardless of the app theme. Swap the inner area for an
 * RTSP/WebRTC/HLS player later — the overlay (label, LIVE badge, detection
 * boxes) can stay as-is.
 */
export function CameraFeed({
  camera,
  showBoxes = true,
  onExpand,
}: {
  camera: Camera;
  showBoxes?: boolean;
  onExpand?: () => void;
}) {
  const online = camera.status === "online";

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl bg-[#0a0f1c] ring-1 ring-black/40">
      {/* Faux feed texture */}
      <div className="absolute inset-0 drishya-grid-bg opacity-50" />
      <div className="absolute inset-0 scanline opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {!online && (
        <div className="absolute inset-0 grid place-items-center bg-black/60">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <VideoOff className="size-7" />
            <span className="text-xs font-medium">No signal</span>
          </div>
        </div>
      )}

      {online && (
        <div className="absolute inset-0 grid place-items-center">
          <CameraIcon className="size-10 text-white/10" />
        </div>
      )}

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5">
        <div className="flex items-center gap-1.5">
          {online ? (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-red-400 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-red-500 live-dot" />
              Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400 backdrop-blur-sm">
              Offline
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[10px] font-medium text-slate-200 backdrop-blur-sm">
            <Wifi className="size-3" />
            {camera.aiEnabled ? "AI on" : "AI off"}
          </span>
        </div>
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Expand camera"
            className="rounded-md bg-black/55 p-1.5 text-slate-200 opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:text-white"
          >
            <Maximize2 className="size-3.5" />
          </button>
        )}
      </div>

      {/* Detection boxes */}
      {online &&
        showBoxes &&
        camera.boxes?.map((b, i) => {
          const label = detectionMeta[b.label].label;
          const critical = b.label === "weapon" || b.label === "fire" || b.label === "intrusion";
          const borderColor = critical ? "#f87171" : b.confidence >= 80 ? "#34d399" : "#fbbf24";
          return (
            <div
              key={i}
              className="absolute rounded-[3px] border-2"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.w}%`,
                height: `${b.h}%`,
                borderColor,
              }}
            >
              <span
                className="absolute -top-[18px] left-0 whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[10px] font-semibold text-black"
                style={{ backgroundColor: borderColor }}
              >
                {label} {b.confidence}%
              </span>
            </div>
          );
        })}

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-2.5">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-white drop-shadow">
            {camera.name} · {camera.location}
          </p>
          <p className="text-[10px] text-slate-300">{camera.zone}</p>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-slate-300">
          {camera.id.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
