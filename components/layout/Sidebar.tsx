"use client";

import { Chip } from "@heroui/react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { navItems } from "./nav";

export function Sidebar({
  newAlertCount,
  onNavigate,
}: {
  newAlertCount: number;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="flex h-16 items-center border-b border-[var(--border)] px-5">
        <Link href="/dashboard" onClick={onNavigate} aria-label="Drishya home">
          <Logo size={30} />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={[
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--drishya-brand-blue-light)] text-[var(--accent)] dark:bg-[color-mix(in_oklab,var(--accent)_22%,transparent)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-tertiary)] hover:text-[var(--foreground)]",
              ].join(" ")}
            >
              <Icon className="size-[18px] shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badgeKey === "alerts" && newAlertCount > 0 && (
                <Chip color="danger" variant="primary" size="sm">
                  {newAlertCount}
                </Chip>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--border)] p-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--surface-tertiary)] hover:text-[var(--danger)]"
        >
          <LogOut className="size-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
