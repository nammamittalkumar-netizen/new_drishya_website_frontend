"use client";

import { Button, Card, Input } from "@heroui/react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import type { Role } from "@/lib/types";

const roles: { id: Role; label: string }[] = [
  { id: "admin", label: "Admin" },
  { id: "operator", label: "Operator" },
  { id: "viewer", label: "Viewer" },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Dummy auth — wire to /api/auth/login later.
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0b1220] p-10 text-white lg:flex">
        <div className="absolute inset-0 drishya-grid-bg opacity-30" />
        <div className="absolute inset-0 scanline opacity-40" />
        <div
          className="absolute -right-24 -top-24 size-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--drishya-brand-blue)" }}
        />
        <div className="relative">
          <Image
            src="/brand/drishya-logo-dark.svg"
            alt="Drishya by Namma CCTV Private Limited"
            width={300}
            height={96}
            priority
            className="h-auto w-[280px]"
          />
        </div>
        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold leading-tight">
            See everything. Miss nothing.
          </h2>
          <p className="mt-3 text-slate-300">
            AI-powered video security that detects people, vehicles, weapons,
            fire and intrusions in real time — across every camera, around the
            clock.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-slate-300">
            {["Person", "Vehicle", "Weapon", "Fire", "Intrusion", "Crowd"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
        <p className="relative text-xs text-slate-400">
          © {new Date().getFullYear()} Namma CCTV Private Limited
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-[var(--background)] p-6">
        <Card className="w-full max-w-md p-7 sm:p-8">
          <div className="mb-6 lg:hidden">
            <Logo size={34} />
          </div>

          <div className="mb-6 flex items-center gap-2 text-[var(--accent)]">
            <ShieldCheck className="size-5" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Secure Sign In
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            AI Surveillance Detection System
          </h1>
          <p className="mt-1.5 text-sm text-[var(--muted)]">
            Sign in to access your monitoring dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                <Input
                  type="email"
                  required
                  defaultValue="arjun@nammacctv.com"
                  placeholder="you@company.com"
                  className="w-full pl-9"
                  aria-label="Email"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-sm font-medium text-[var(--foreground)]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  defaultValue="demo1234"
                  placeholder="••••••••"
                  className="w-full px-9"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const active = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      aria-pressed={active}
                      className={[
                        "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "border-[var(--accent)] bg-[var(--drishya-brand-blue-light)] text-[var(--accent)] dark:bg-[color-mix(in_oklab,var(--accent)_22%,transparent)]"
                          : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]",
                      ].join(" ")}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isDisabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--muted)]">
            Protected system. Access is logged and audited.
          </p>
        </Card>
      </div>
    </div>
  );
}
