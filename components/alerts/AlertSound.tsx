"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "drishya:alert-muted";

/** Synthesize a short two-tone alarm with the Web Audio API. */
function beep(ctx: AudioContext) {
  const now = ctx.currentTime;
  for (const [offset, freq] of [
    [0, 988],
    [0.28, 988],
  ] as const) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, now + offset);
    gain.gain.setValueAtTime(0.0001, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.22, now + offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.24);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + offset);
    osc.stop(now + offset + 0.26);
  }
}

/**
 * Plays an alarm whenever active ("new") alerts are detected — on first load
 * if any exist, and again each time the count rises. Includes a mute toggle.
 */
export function AlertSound({ newAlertCount }: { newAlertCount: number }) {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const pendingRef = useRef(false);
  const prevCount = useRef<number | null>(null);

  // Restore the saved mute preference.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) === "1";
    setMuted(saved);
    mutedRef.current = saved;
  }, []);

  const tryPlay = useCallback(() => {
    if (mutedRef.current) return;
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = (ctxRef.current ??= new Ctx());
    // Browsers suspend audio until a user gesture; defer until then.
    if (ctx.state === "suspended") {
      pendingRef.current = true;
      void ctx.resume().catch(() => {});
      if (ctx.state === "suspended") return;
    }
    beep(ctx);
    pendingRef.current = false;
  }, []);

  // Flush a deferred alarm on the first user interaction.
  useEffect(() => {
    const onGesture = () => {
      const ctx = ctxRef.current;
      if (!pendingRef.current || !ctx || mutedRef.current) return;
      void ctx.resume().then(() => {
        beep(ctx);
        pendingRef.current = false;
      });
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  // Trigger the alarm on initial alerts and on any increase.
  useEffect(() => {
    if (prevCount.current === null) {
      prevCount.current = newAlertCount;
      if (newAlertCount > 0) tryPlay();
      return;
    }
    if (newAlertCount > prevCount.current) tryPlay();
    prevCount.current = newAlertCount;
  }, [newAlertCount, tryPlay]);

  const toggle = () => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute alert sound" : "Mute alert sound"}
      aria-pressed={muted}
      title={muted ? "Alert sound off" : "Alert sound on"}
      className="grid size-9 place-items-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-tertiary)] hover:text-[var(--foreground)]"
    >
      {muted ? (
        <VolumeX className="size-[18px]" />
      ) : (
        <Volume2 className="size-[18px]" />
      )}
    </button>
  );
}
