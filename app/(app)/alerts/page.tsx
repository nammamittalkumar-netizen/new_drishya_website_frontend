import { Download } from "lucide-react";
import { AlertsTable } from "@/components/alerts/AlertsTable";
import { Button } from "@heroui/react";
import { PageHeader } from "@/components/ui/PageHeader";
import { getAlerts } from "@/lib/api";

export const metadata = { title: "Alerts" };

export default async function AlertsPage() {
  const alerts = await getAlerts();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts"
        subtitle="All AI detections across your camera network."
        actions={
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export report
          </Button>
        }
      />
      <AlertsTable alerts={alerts} />
    </div>
  );
}
