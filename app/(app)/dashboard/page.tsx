import { Video } from "lucide-react";
import { RecentAlertItem } from "@/components/alerts/RecentAlertItem";
import { LivePreviewSwitcher } from "@/components/cameras/LivePreviewSwitcher";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { getCameras, getRecentAlerts } from "@/lib/api";

export default async function DashboardPage() {
  const [cameras, recent] = await Promise.all([
    getCameras(),
    getRecentAlerts(8),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Live camera feeds and the latest AI detections."
        actions={
          <ButtonLink variant="primary" size="sm" href="/live">
            <Video className="size-4" />
            Live Monitoring
          </ButtonLink>
        }
      />

      <div className="grid items-start gap-6 xl:grid-cols-3">
        {/* Big live viewer */}
        <SectionCard
          title="Live Camera Preview"
          description="Select any camera to view it live"
          className="xl:col-span-2"
          action={
            <ButtonLink href="/live" variant="ghost" size="sm">
              View all
            </ButtonLink>
          }
        >
          <LivePreviewSwitcher cameras={cameras} />
        </SectionCard>

        {/* Alert notifications — same level as the camera */}
        <SectionCard
          title="Alert Notifications"
          description="Latest AI detections with snapshots"
          action={
            <ButtonLink href="/alerts" variant="ghost" size="sm">
              All alerts
            </ButtonLink>
          }
          bodyClassName="p-2"
        >
          <div className="divide-y divide-[var(--separator)]">
            {recent.map((a) => (
              <RecentAlertItem key={a.id} alert={a} />
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
