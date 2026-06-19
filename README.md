# Drishya — AI Surveillance Detection System (UI)

Front-end for the Drishya AI video-security platform by **Namma CCTV Private Limited**.
Built with **Next.js 16 (App Router)**, **HeroUI v3**, **Tailwind CSS v4** and **Recharts**.

The UI is fully built with **static/dummy data** and is **API-ready** — every screen
reads through `lib/api.ts`, so connecting a real backend means editing one file.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Demo login: any email/password works — the form just navigates to the dashboard.
(Prefilled with `arjun@nammacctv.com` / `demo1234`.)

## Pages

| Route            | Description                                                          |
| ---------------- | ------------------------------------------------------------------- |
| `/`              | Login (role selector: Admin / Operator / Viewer)                    |
| `/dashboard`     | Stat cards, live preview grid, recent alerts, charts, system health |
| `/live`          | Live monitoring grid — zone/status filters, grid density, fullscreen |
| `/alerts`        | Alerts table with search + status/severity filters                  |
| `/alerts/[id]`   | Incident details — snapshot, clip, AI confidence, status workflow   |
| `/cameras`       | Camera management — add/edit/disable, test connection               |
| `/reports`       | Charts: over time, by camera, by category, high-risk zones, export  |
| `/users`         | Users & roles + audit log                                           |
| `/settings`      | Detection toggles, sensitivity, notifications, privacy, API config  |

## Project structure

```
app/
  layout.tsx            Root layout (Inter font, theme provider, metadata)
  page.tsx              Login
  (app)/                Authenticated area (shared sidebar + topbar shell)
    layout.tsx
    dashboard|live|alerts|incidents|cameras|reports|users|settings/
components/
  brand/                Logo lockup
  layout/               Sidebar, Topbar, AppShell, ThemeToggle, nav config
  ui/                   StatCard, SectionCard, Chips, ButtonLink, Toggle, …
  cameras/              CameraFeed (placeholder with detection boxes), managers
  alerts/               AlertsTable, RecentAlertItem, IncidentStatusPanel
  charts/               Recharts wrappers (area, bar, donut)
lib/
  types.ts              Domain types
  data.ts               Dummy data
  api.ts                API-ready data access layer  <-- connect backend here
  ui.ts                 Labels, colors, icons, formatters
```

## Theming & brand

- Brand tokens (`#1868D8` Brand Blue, etc.) come from `drishya_brand_kit` and are
  mapped onto HeroUI's CSS variables in `app/globals.css`.
- Light-first per the brand kit, with a **dark control-room mode** toggle (top bar).
- Brand assets (logo, mark, favicons) live in `public/` and `public/brand/`.

## Connecting the real backend

Replace the function bodies in `lib/api.ts` with `fetch` calls. Set the base URL via
`NEXT_PUBLIC_API_BASE`. For real-time alerts, add a WebSocket subscription and feed it
into the alerts list. The video placeholders in `components/cameras/CameraFeed.tsx`
can be swapped for an RTSP/WebRTC/HLS player while keeping the overlay (LIVE badge,
labels, bounding boxes).

> AI confidence is shown on every detection and a manual review status is required —
> detections are surfaced as suggestions, not final decisions.
