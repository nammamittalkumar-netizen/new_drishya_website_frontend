"use client";

import { Button } from "@heroui/react";
import { Check } from "lucide-react";
import { useState } from "react";
import type { AlertStatus } from "@/lib/types";
import { ALL_STATUSES, statusMeta } from "@/lib/ui";

export function IncidentStatusPanel({
  initialStatus,
  initialNote,
}: {
  initialStatus: AlertStatus;
  initialNote?: string;
}) {
  const [status, setStatus] = useState<AlertStatus>(initialStatus);
  const [note, setNote] = useState(initialNote ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Update status
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map((s) => {
            const active = status === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus(s);
                  setSaved(false);
                }}
                aria-pressed={active}
                className={[
                  "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-[var(--accent)] bg-[var(--drishya-brand-blue-light)] text-[var(--accent)] dark:bg-[color-mix(in_oklab,var(--accent)_22%,transparent)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)]",
                ].join(" ")}
              >
                {statusMeta[s].label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
          Operator notes
        </label>
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setSaved(false);
          }}
          rows={4}
          placeholder="Add context, actions taken, or escalation details…"
          className="w-full resize-none rounded-lg border border-[var(--border)] bg-[var(--field-background,var(--surface))] p-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" size="sm" onPress={() => setSaved(true)}>
          Save update
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-[var(--success)]">
            <Check className="size-4" />
            Saved (demo)
          </span>
        )}
      </div>
    </div>
  );
}
