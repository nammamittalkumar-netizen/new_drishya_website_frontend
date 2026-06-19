import { ArrowLeft, Clock, MapPin, Play, ScanEye, UserCog } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IncidentStatusPanel } from "@/components/alerts/IncidentStatusPanel";
import { CameraFeed } from "@/components/cameras/CameraFeed";
import { SeverityChip, StatusChip } from "@/components/ui/Chips";
import { ConfidenceMeter } from "@/components/ui/ConfidenceMeter";
import { SectionCard } from "@/components/ui/SectionCard";
import { getAlert, getCamera } from "@/lib/api";
import { detectionMeta, formatDateTime } from "@/lib/ui";
import type { Camera } from "@/lib/types";

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const alert = await getAlert(id);
  if (!alert) notFound();

  const camera = await getCamera(alert.cameraId);
  const meta = detectionMeta[alert.detection];
  const Icon = meta.icon;

  // Build a feed view focused on this detection.
  const feedCamera: Camera = camera ?? {
    id: alert.cameraId,
    name: alert.cameraName,
    location: alert.location,
    zone: "—",
    status: "online",
    streamUrl: "",
    aiEnabled: true,
    detections: [alert.detection],
  };

  return (
    <div className="space-y-6">
      <Link
        href="/alerts"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="size-4" />
        Back to alerts
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl tint-accent">
              <Icon className="size-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
                {meta.label} detected
              </h1>
              <p className="text-sm text-[var(--muted)]">
                Incident {alert.id} · {alert.cameraName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SeverityChip severity={alert.severity} />
          <StatusChip status={alert.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard
            title="Snapshot"
            description="Frame captured at time of detection"
          >
            <CameraFeed camera={feedCamera} />
          </SectionCard>

        

        
        </div>

        <div className="space-y-6">
          <SectionCard title="Detection Details" bodyClassName="p-0">
            <dl className="divide-y divide-[var(--separator)]">
              <DetailRow
                icon={<ScanEye className="size-4" />}
                label="Detection type"
                value={meta.label}
              />
              <DetailRow
                icon={<Clock className="size-4" />}
                label="Timestamp"
                value={formatDateTime(alert.time)}
              />
              <DetailRow
                icon={<MapPin className="size-4" />}
                label="Location"
                value={`${alert.location}${camera ? ` · ${camera.zone}` : ""}`}
              />
              <DetailRow
                icon={<UserCog className="size-4" />}
                label="Assigned to"
                value={alert.assignedTo ?? "Unassigned"}
              />
            </dl>
            <div className="border-t border-[var(--separator)] px-5 py-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                AI confidence
              </p>
              <ConfidenceMeter value={alert.confidence} />
              <p className="mt-2 text-xs text-[var(--muted)]">
                AI detections are not always final. Confirm before acting on
                high-impact alerts.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Camera" description="Source device">
            <div className="space-y-1 text-sm">
              <p className="font-medium text-[var(--foreground)]">
                {alert.cameraName}
              </p>
              <p className="text-[var(--muted)]">{alert.location}</p>
              <p className="font-mono text-xs text-[var(--muted)]">
                {alert.cameraId.toUpperCase()}
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <span className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
        {icon}
        {label}
      </span>
      <span className="text-right text-sm font-medium text-[var(--foreground)]">
        {value}
      </span>
    </div>
  );
}
