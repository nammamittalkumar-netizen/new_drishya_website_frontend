"use client";

import { Avatar, Button, Input } from "@heroui/react";
import { Bell, Menu, Search } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar({
  newAlertCount,
  onOpenSidebar,
}: {
  newAlertCount: number;
  onOpenSidebar: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="sm"
        isIconOnly
        aria-label="Open menu"
        className="lg:hidden"
        onPress={onOpenSidebar}
      >
        <Menu className="size-5" />
      </Button>

      <div className="hidden max-w-sm flex-1 items-center md:flex">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
          <Input
            type="search"
            placeholder="Search cameras, alerts, locations…"
            className="w-full pl-9"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />

        <Link
          href="/alerts"
          aria-label={`Alerts, ${newAlertCount} new`}
          className="relative grid size-9 place-items-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-tertiary)] hover:text-[var(--foreground)]"
        >
          <Bell className="size-[18px]" />
          {newAlertCount > 0 && (
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[var(--danger)] ring-2 ring-[var(--surface)]" />
          )}
        </Link>

        <div className="mx-1 hidden h-6 w-px bg-[var(--border)] sm:block" />

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-xl px-1.5 py-1 transition-colors hover:bg-[var(--surface-tertiary)] sm:pr-3"
          aria-label="Account menu"
        >
          <Avatar size="sm" className="ring-2 ring-[var(--surface)]">
            <Avatar.Image
              alt="Arjun Rao"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback className="bg-[var(--accent)] font-semibold text-white">
              AR
            </Avatar.Fallback>
          </Avatar>
          <div className="hidden items-start text-left leading-tight sm:flex sm:flex-col">
            <span className="text-sm font-semibold text-[var(--foreground)]">
              Arjun Rao
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--muted)]">
              <span className="size-1.5 rounded-full bg-[var(--success)]" />
              Admin
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
