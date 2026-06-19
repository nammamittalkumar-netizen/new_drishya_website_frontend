import { Button } from "@heroui/react";
import { Check, Lock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { Toggle } from "@/components/ui/Toggle";
import { detectionMeta } from "@/lib/ui";
import type { DetectionType } from "@/lib/types";

export const metadata = { title: "Settings" };

// `locked: true` = feature not available in the current plan / license.
// Flip these flags to control which detections are unlocked.
const detectionTypes: { type: DetectionType; locked: boolean }[] = [
  { type: "person", locked: false },
  { type: "vehicle", locked: false },
  { type: "intrusion", locked: false },
  { type: "fire", locked: false },
  { type: "weapon", locked: true },
  { type: "crowd", locked: true },
  { type: "suspicious", locked: true },
];

const fieldClass =
  "h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--field-background,var(--surface))] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Configure detection, notifications, privacy and system access."
        actions={
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        }
      />

      {/* Detection types — full width, compact tiles */}
      <SectionCard
        title="AI Detection Types"
        description="Detections included in your plan are unlocked; others need an upgrade"
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {detectionTypes.map(({ type, locked }) => {
            const Icon = detectionMeta[type].icon;
            return (
              <div
                key={type}
                className={`flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] px-3.5 py-3 ${
                  locked ? "opacity-65" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-lg ${
                      locked ? "tint-default" : "tint-accent"
                    }`}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <p className="truncate text-sm font-medium text-[var(--foreground)]">
                    {detectionMeta[type].label}
                  </p>
                </div>
                {locked ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--surface-tertiary)] px-2.5 py-1 text-xs font-semibold text-[var(--muted)]">
                    <Lock className="size-3.5" />
                    Locked
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tint-success">
                    <Check className="size-3.5" />
                    Unlocked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Notifications + Privacy side by side */}
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <SectionCard
          title="Notifications"
          description="How operators are alerted"
          bodyClassName="px-5 py-1 divide-y divide-[var(--separator)]"
        >
          <Toggle
            label="In-app alerts"
            defaultOn
            description="Real-time toasts and badges"
          />
          <Toggle
            label="Email notifications"
            defaultOn
            description="Daily summary + critical alerts"
          />
          <Toggle
            label="SMS for critical alerts"
            description="Weapon, fire and intrusion only"
          />
        </SectionCard>

        <SectionCard
          title="Privacy & Data"
          description="Retention and masking controls"
          bodyClassName="px-5 py-1"
        >
          <div className="divide-y divide-[var(--separator)]">
            <Toggle
              label="Blur / mask sensitive areas"
              defaultOn
              description="Privacy masking on configured zones"
            />
            <Toggle
              label="Anonymize faces in exports"
              description="Apply blur when exporting clips"
            />
            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">
                  Data retention
                </p>
                <p className="text-xs text-[var(--muted)]">
                  How long recordings and alerts are kept
                </p>
              </div>
              <select
                className={`${fieldClass} max-w-[160px]`}
                defaultValue="30"
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Server / API config — full width */}
      <SectionCard
        title="Server / API Configuration"
        description="Connection to the detection backend (placeholder)"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
              API base URL
            </label>
            <input
              className={fieldClass}
              defaultValue="http://localhost:8000/api"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
              WebSocket URL (real-time alerts)
            </label>
            <input
              className={fieldClass}
              defaultValue="ws://localhost:8000/ws"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Button variant="outline" size="sm">
            Test connection
          </Button>
          <p className="text-xs text-[var(--muted)]">
            UI only — these values will drive the API client once the backend is
            connected.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
