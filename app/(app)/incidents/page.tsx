import { AlertsTable } from "@/components/alerts/AlertsTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAlerts } from "@/lib/api";

export const metadata = { title: "Incidents" };

export default async function IncidentsPage() {
  const alerts = await getAlerts();
  // Incidents = serious or actively-handled detections.
  const incidents = alerts.filter(
    (a) =>
      a.severity === "critical" ||
      a.severity === "high" ||
      a.status === "confirmed" ||
      a.status === "reviewing",
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incidents"
        subtitle="High-priority detections requiring operator review."
      />
      <AlertsTable alerts={incidents} />
    </div>
  );
}
