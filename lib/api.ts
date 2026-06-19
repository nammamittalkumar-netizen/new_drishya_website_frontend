// API-ready data access layer.
//
// Every screen reads through these functions instead of importing the dummy
// data directly. When the backend is ready, replace the bodies with `fetch`
// calls (and optionally a websocket for live alerts) — the rest of the UI
// won't need to change.
//
//   Example:
//   export async function getAlerts(): Promise<Alert[]> {
//     const res = await fetch(`${API_BASE}/alerts`, { cache: "no-store" });
//     if (!res.ok) throw new Error("Failed to load alerts");
//     return res.json();
//   }

import {
  alerts,
  alertsByCamera,
  alertsByType,
  alertsOverTime,
  auditLog,
  cameras,
  stats,
  users,
} from "./data";
import type {
  Alert,
  AuditEntry,
  Camera,
  DashboardStats,
  NamedCount,
  TimePoint,
  User,
} from "./types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000/api";

// Simulate a small network delay so loading states are exercisable.
function delay<T>(value: T, ms = 0): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function getStats(): Promise<DashboardStats> {
  return delay(stats);
}

export async function getCameras(): Promise<Camera[]> {
  return delay(cameras);
}

export async function getCamera(id: string): Promise<Camera | undefined> {
  return delay(cameras.find((c) => c.id === id));
}

export async function getAlerts(): Promise<Alert[]> {
  return delay(alerts);
}

export async function getAlert(id: string): Promise<Alert | undefined> {
  return delay(alerts.find((a) => a.id === id));
}

export async function getRecentAlerts(limit = 6): Promise<Alert[]> {
  return delay(alerts.slice(0, limit));
}

export async function getUsers(): Promise<User[]> {
  return delay(users);
}

export async function getAuditLog(): Promise<AuditEntry[]> {
  return delay(auditLog);
}

export interface ReportsData {
  overTime: TimePoint[];
  byCamera: NamedCount[];
  byType: NamedCount[];
}

export async function getReports(): Promise<ReportsData> {
  return delay({
    overTime: alertsOverTime,
    byCamera: alertsByCamera,
    byType: alertsByType,
  });
}
