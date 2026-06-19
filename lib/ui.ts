// UI mapping helpers: labels, colors and icons for domain enums.
import {
  AlertTriangle,
  Car,
  Flame,
  PersonStanding,
  ScanEye,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import type {
  AlertStatus,
  DetectionType,
  Severity,
} from "./types";

type ChipColor = "accent" | "danger" | "default" | "success" | "warning";

export const detectionMeta: Record<
  DetectionType,
  { label: string; icon: LucideIcon }
> = {
  person: { label: "Person", icon: PersonStanding },
  vehicle: { label: "Vehicle", icon: Car },
  weapon: { label: "Weapon", icon: ShieldAlert },
  fire: { label: "Fire / Smoke", icon: Flame },
  intrusion: { label: "Intrusion", icon: AlertTriangle },
  crowd: { label: "Crowd", icon: Users },
  suspicious: { label: "Suspicious", icon: ScanEye },
};

export function detectionLabel(d: DetectionType): string {
  return detectionMeta[d].label;
}

export const severityMeta: Record<
  Severity,
  { label: string; chip: ChipColor }
> = {
  critical: { label: "Critical", chip: "danger" },
  high: { label: "High", chip: "danger" },
  medium: { label: "Medium", chip: "warning" },
  low: { label: "Low", chip: "accent" },
};

export const statusMeta: Record<
  AlertStatus,
  { label: string; chip: ChipColor }
> = {
  new: { label: "New", chip: "accent" },
  reviewing: { label: "Reviewing", chip: "warning" },
  confirmed: { label: "Confirmed", chip: "danger" },
  false_alarm: { label: "False Alarm", chip: "default" },
  resolved: { label: "Resolved", chip: "success" },
};

export const ALL_STATUSES: AlertStatus[] = [
  "new",
  "reviewing",
  "confirmed",
  "false_alarm",
  "resolved",
];

export const ALL_SEVERITIES: Severity[] = [
  "critical",
  "high",
  "medium",
  "low",
];

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/** Border/text accent class for a detection bounding box on a feed. */
export function boxColorClass(severityOrType: Severity): string {
  switch (severityOrType) {
    case "critical":
    case "high":
      return "border-[var(--danger)] text-[var(--danger)]";
    case "medium":
      return "border-[var(--warning)] text-[var(--warning)]";
    default:
      return "border-[var(--accent)] text-[var(--accent)]";
  }
}
