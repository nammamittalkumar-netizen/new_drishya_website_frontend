import { Card } from "@heroui/react";
import type { LucideIcon } from "lucide-react";

type Tone = "default" | "accent" | "success" | "warning" | "danger";

const tintClass: Record<Tone, string> = {
  default: "tint-default",
  accent: "tint-accent",
  success: "tint-success",
  warning: "tint-warning",
  danger: "tint-danger",
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: Tone;
  hint?: string;
  emphasize?: boolean;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
  hint,
  emphasize = false,
}: StatCardProps) {
  return (
    <Card className={`p-4 ${emphasize ? "ring-danger-soft" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {value}
          </p>
          {hint && (
            <p className="mt-1 truncate text-xs text-[var(--muted)]">{hint}</p>
          )}
        </div>
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl ${tintClass[tone]}`}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </Card>
  );
}
