import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Settings,
  Video,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Optional badge count shown on the right. */
  badgeKey?: "alerts";
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live Monitoring", href: "/live", icon: Video },
  { label: "Alerts", href: "/alerts", icon: Bell, badgeKey: "alerts" },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];
