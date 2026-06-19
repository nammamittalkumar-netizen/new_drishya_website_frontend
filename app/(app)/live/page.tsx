import { LiveMonitor } from "@/components/cameras/LiveMonitor";
import { PageHeader } from "@/components/ui/PageHeader";
import { getCameras } from "@/lib/api";

export const metadata = { title: "Live Monitoring" };

export default async function LivePage() {
  const cameras = await getCameras();
  const online = cameras.filter((c) => c.status === "online").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Monitoring"
        subtitle={`${online} of ${cameras.length} cameras online · AI detection overlays active`}
      />
      <LiveMonitor cameras={cameras} />
    </div>
  );
}
