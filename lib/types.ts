// Domain types for the Drishya AI Surveillance Detection System.
// These mirror the shape we expect the backend API to return later.

export type Role = "admin" | "operator" | "viewer";

export type DetectionType =
  | "person"
  | "vehicle"
  | "weapon"
  | "fire"
  | "intrusion"
  | "crowd"
  | "suspicious";

export type Severity = "critical" | "high" | "medium" | "low";

export type AlertStatus =
  | "new"
  | "reviewing"
  | "confirmed"
  | "false_alarm"
  | "resolved";

export type CameraStatus = "online" | "offline";

export type ServerStatus = "online" | "offline" | "degraded";

export interface BoundingBox {
  /** All values are percentages (0-100) relative to the frame. */
  x: number;
  y: number;
  w: number;
  h: number;
  label: DetectionType;
  confidence: number;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  zone: string;
  status: CameraStatus;
  streamUrl: string;
  aiEnabled: boolean;
  detections: DetectionType[];
  /** Most recent detection summary for live tiles. */
  lastDetection?: DetectionType;
  lastConfidence?: number;
  boxes?: BoundingBox[];
}

export interface Alert {
  id: string;
  time: string; // ISO timestamp
  cameraId: string;
  cameraName: string;
  location: string;
  detection: DetectionType;
  severity: Severity;
  confidence: number;
  status: AlertStatus;
  assignedTo?: string;
  note?: string;
  snapshot?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "disabled";
  lastActive: string;
}

export interface AuditEntry {
  id: string;
  time: string;
  actor: string;
  action: string;
  target: string;
}

export interface DashboardStats {
  totalCameras: number;
  activeCameras: number;
  alertsToday: number;
  criticalAlerts: number;
  serverStatus: ServerStatus;
  storageUsedPct: number;
  modelHealthPct: number;
}

export interface TimePoint {
  label: string;
  alerts: number;
  critical: number;
}

export interface NamedCount {
  name: string;
  value: number;
}
