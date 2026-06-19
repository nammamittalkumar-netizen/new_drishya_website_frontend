import { Chip } from "@heroui/react";
import type { AlertStatus, DetectionType, Severity } from "@/lib/types";
import { detectionMeta, severityMeta, statusMeta } from "@/lib/ui";

export function SeverityChip({ severity }: { severity: Severity }) {
  const m = severityMeta[severity];
  return (
    <Chip color={m.chip} variant="soft" size="sm">
      {m.label}
    </Chip>
  );
}

export function StatusChip({ status }: { status: AlertStatus }) {
  const m = statusMeta[status];
  return (
    <Chip color={m.chip} variant="soft" size="sm">
      {m.label}
    </Chip>
  );
}

export function DetectionChip({ type }: { type: DetectionType }) {
  const m = detectionMeta[type];
  const Icon = m.icon;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--foreground)]">
      <Icon className="size-3.5 text-[var(--muted)]" />
      {m.label}
    </span>
  );
}
