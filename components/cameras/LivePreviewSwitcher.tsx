"use client";

import {
  Camera as SnapshotIcon,
  Circle,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Camera } from "@/lib/types";
import { CameraFeed } from "./CameraFeed";

export function LivePreviewSwitcher({ cameras }: { cameras: Camera[] }) {
  const firstOnline = cameras.find((c) => c.status === "online") ?? cameras[0];
  const [selectedId, setSelectedId] = useState(firstOnline?.id);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [recording, setRecording] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const selected = cameras.find((c) => c.id === selectedId) ?? firstOnline;
  if (!selected) return null;

  const controlBtn =
    "grid size-9 place-items-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-tertiary)] hover:text-[var(--foreground)]";

  return (
    <div className="space-y-3">
      {/* Main viewer */}
      <CameraFeed camera={selected} onExpand={() => setFullscreen(true)} />

      {/* Control bar */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-2 py-1.5">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            className={controlBtn}
            onClick={() => setPlaying((v) => !v)}
          >
            {playing ? (
              <Pause className="size-[18px]" />
            ) : (
              <Play className="size-[18px]" />
            )}
          </button>
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            className={controlBtn}
            onClick={() => setMuted((v) => !v)}
          >
            {muted ? (
              <VolumeX className="size-[18px]" />
            ) : (
              <Volume2 className="size-[18px]" />
            )}
          </button>
          <button
            type="button"
            aria-label="Take snapshot"
            className={controlBtn}
          >
            <SnapshotIcon className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label={recording ? "Stop recording" : "Start recording"}
            onClick={() => setRecording((v) => !v)}
            className={`${controlBtn} ${recording ? "text-[var(--danger)]" : ""}`}
          >
            <Circle
              className={`size-[18px] ${recording ? "fill-[var(--danger)] live-dot" : ""}`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tabular-nums text-[var(--muted)]">
            {clock}
          </span>
          <button
            type="button"
            aria-label="Fullscreen"
            className={controlBtn}
            onClick={() => setFullscreen(true)}
          >
            <Maximize2 className="size-[18px]" />
          </button>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {cameras.map((cam) => {
          const active = cam.id === selected.id;
          const camOnline = cam.status === "online";
          return (
            <button
              key={cam.id}
              type="button"
              onClick={() => setSelectedId(cam.id)}
              aria-pressed={active}
              aria-label={`Show ${cam.name}, ${cam.location}`}
              className={`group relative aspect-video overflow-hidden rounded-lg bg-[#0a0f1c] ring-2 transition ${
                active
                  ? "ring-[var(--accent)]"
                  : "ring-transparent hover:ring-[var(--border)]"
              }`}
            >
              <span className="absolute inset-0 drishya-grid-bg opacity-50" />
              <span className="absolute inset-0 scanline opacity-60" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span
                className={`absolute left-1.5 top-1.5 size-1.5 rounded-full ${
                  camOnline ? "bg-red-500 live-dot" : "bg-slate-500"
                }`}
              />
              <span className="absolute inset-x-1.5 bottom-1 truncate text-left text-[10px] font-medium text-white drop-shadow">
                {cam.name}
              </span>
              {!camOnline && (
                <span className="absolute inset-0 grid place-items-center text-[9px] font-semibold uppercase text-slate-400">
                  Offline
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Fullscreen */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl">
            <div className="mb-3 flex items-center justify-between text-white">
              <p className="font-semibold">
                {selected.name} · {selected.location}
              </p>
              <button
                type="button"
                aria-label="Close fullscreen"
                onClick={() => setFullscreen(false)}
                className="grid size-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
              >
                <X className="size-5" />
              </button>
            </div>
            <CameraFeed camera={selected} />
          </div>
        </div>
      )}
    </div>
  );
}
