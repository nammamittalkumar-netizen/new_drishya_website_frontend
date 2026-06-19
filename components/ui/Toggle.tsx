"use client";

import { Lock } from "lucide-react";
import { useState, type ReactNode } from "react";

export function Toggle({
  defaultOn = false,
  label,
  description,
  icon,
  locked = false,
  lockedHint = "Locked",
}: {
  defaultOn?: boolean;
  label: string;
  description?: string;
  icon?: ReactNode;
  /** When locked, the feature can't be toggled (e.g. not in plan / managed elsewhere). */
  locked?: boolean;
  lockedHint?: string;
}) {
  const [on, setOn] = useState(defaultOn && !locked);

  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 ${
        locked ? "opacity-60" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {icon && (
          <span className="grid size-8 shrink-0 place-items-center rounded-lg tint-default">
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
            {label}
            {locked && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-tertiary)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                <Lock className="size-3" />
                {lockedHint}
              </span>
            )}
          </p>
          {description && (
            <p className="text-xs text-[var(--muted)]">{description}</p>
          )}
        </div>
      </div>

      {locked ? (
        <span
          className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--surface-tertiary)] text-[var(--muted)]"
          aria-label={`${label} is locked`}
        >
          <Lock className="size-3.5" />
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label={label}
          onClick={() => setOn((v) => !v)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            on ? "bg-[var(--accent)]" : "bg-[var(--surface-tertiary)]"
          }`}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
              on ? "left-[22px]" : "left-0.5"
            }`}
          />
        </button>
      )}
    </div>
  );
}
