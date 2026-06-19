import { AppShell } from "@/components/layout/AppShell";
import { getAlerts } from "@/lib/api";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const alerts = await getAlerts();
  const newAlertCount = alerts.filter((a) => a.status === "new").length;

  return <AppShell newAlertCount={newAlertCount}>{children}</AppShell>;
}
