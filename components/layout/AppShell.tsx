"use client";

import { X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({
  newAlertCount,
  children,
}: {
  newAlertCount: number;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-[var(--background)]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar newAlertCount={newAlertCount} />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar
              newAlertCount={newAlertCount}
              onNavigate={() => setMobileOpen(false)}
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute -right-11 top-3 grid size-9 place-items-center rounded-lg bg-[var(--surface)] text-[var(--foreground)] ring-1 ring-[var(--border)]"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          newAlertCount={newAlertCount}
          onOpenSidebar={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
