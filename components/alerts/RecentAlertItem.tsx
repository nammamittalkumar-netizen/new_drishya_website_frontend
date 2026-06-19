import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Alert } from "@/lib/types";
import { detectionMeta, formatTime } from "@/lib/ui";
import { SeverityChip } from "@/components/ui/Chips";
import { AlertThumb } from "./AlertThumb";

export function RecentAlertItem({ alert }: { alert: Alert }) {
  const d = detectionMeta[alert.detection];

  return (
    <Link
      href={`/alerts/${alert.id}`}
      className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[var(--surface-tertiary)]"
    >
      <AlertThumb alert={alert} className="w-20" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-[var(--foreground)]">
            {d.label}
          </p>
          <SeverityChip severity={alert.severity} />
        </div>
        <p className="truncate text-xs text-[var(--muted)]">
          {alert.cameraName} · {alert.location}
        </p>
        <p className="text-xs text-[var(--muted)]">
          {formatTime(alert.time)} · {alert.confidence}% confidence
        </p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
