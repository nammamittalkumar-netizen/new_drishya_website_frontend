import { Button } from "@heroui/react";
import { FileText, Sheet } from "lucide-react";
import { AlertsAreaChart } from "@/components/charts/AlertsAreaChart";
import { AlertsBarChart } from "@/components/charts/AlertsBarChart";
import { DetectionPieChart } from "@/components/charts/DetectionPieChart";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { getAlerts, getReports } from "@/lib/api";
import { AlertOctagon, Bell, ShieldX, Activity } from "lucide-react";

export const metadata = { title: "Reports" };

export default async function ReportsPage() {
  const [reports, alerts] = await Promise.all([getReports(), getAlerts()]);

  const total = alerts.length;
  const critical = alerts.filter(
    (a) => a.severity === "critical" || a.severity === "high",
  ).length;
  const falseAlarms = alerts.filter((a) => a.status === "false_alarm").length;
  const resolved = alerts.filter((a) => a.status === "resolved").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Understand activity, trends and high-risk zones."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Sheet className="size-4" />
              CSV
            </Button>
            <Button variant="primary" size="sm">
              <FileText className="size-4" />
              Export PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Alerts" value={total} icon={Bell} tone="accent" />
        <StatCard
          label="High / Critical"
          value={critical}
          icon={AlertOctagon}
          tone="danger"
        />
        <StatCard
          label="False Alarms"
          value={falseAlarms}
          icon={ShieldX}
          tone="warning"
        />
        <StatCard
          label="Resolved"
          value={resolved}
          icon={Activity}
          tone="success"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard
          title="Alerts Over Time"
          description="Trend across the day"
          className="xl:col-span-2"
        >
          <AlertsAreaChart data={reports.overTime} />
        </SectionCard>
        <SectionCard title="Alert Categories" description="By detection type">
          <DetectionPieChart data={reports.byType} />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Alerts by Camera"
          description="Highest-activity cameras"
        >
          <AlertsBarChart data={reports.byCamera} />
        </SectionCard>
        <SectionCard
          title="High-Risk Zones"
          description="Locations with most critical detections"
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-[var(--separator)]">
            {[
              { zone: "Parking Lot B", level: "High", count: 7 },
              { zone: "Back Door", level: "High", count: 6 },
              { zone: "Perimeter West", level: "Medium", count: 5 },
              { zone: "Warehouse", level: "Medium", count: 4 },
              { zone: "Main Gate", level: "Low", count: 3 },
            ].map((r) => (
              <li
                key={r.zone}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">
                    {r.zone}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {r.count} critical detections
                  </p>
                </div>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor:
                      r.level === "High"
                        ? "color-mix(in oklab, var(--danger) 16%, transparent)"
                        : r.level === "Medium"
                          ? "color-mix(in oklab, var(--warning) 18%, transparent)"
                          : "var(--surface-tertiary)",
                    color:
                      r.level === "High"
                        ? "var(--danger)"
                        : r.level === "Medium"
                          ? "var(--warning)"
                          : "var(--muted)",
                  }}
                >
                  {r.level}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
