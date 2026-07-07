# Ultrawares Website

## Overview

Frontend application for the **Ultrawares company website** — showcasing services, projects, and portfolio with rich animations and multi-language support.

- **Related systems:** Ultrawares backend API
- **Target users:** Public / Customers

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js | 16.0.0 |
| Language | TypeScript | 5.7.0 |
| Runtime | React | 19.0.0 |
| State Management | React Context API | — |
| UI Library | MUI (Material UI) | 9.1.1 |
| Styling | Emotion (CSS-in-JS) | 11.14.x |
| Animations | Framer Motion | 12.40.0 |
| i18n | next-intl | 4.8.3 |
| Package Manager | pnpm | 10.12.1 |

---

## Project Structure

```
src/
├── app/
│   └── [locale]/           # Locale-aware routing (next-intl)
│       ├── page.tsx
│       ├── about/
│       ├── contact/
│       ├── services/
│       ├── projects/
│       │   └── [id]/
│       └── gallery/
├── components/
│   ├── Layout/             # Navbar, Footer, AppShell
│   ├── Pages/              # Page-level section components
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Service/
│   │   ├── Projects/
│   │   ├── ProjectDetails/
│   │   └── Gallery/
│   └── shared/             # Reusable UI atoms (buttons, splash screen, etc.)
├── providers/              # AppProviders, Theme
├── theme/                  # MUI theme, palette, typography, global styles
├── lib/                    # API utilities, theme helpers
└── i18n/                   # Routing and request config
```

---

## Backend Reference

- **Backend Repo:** https://gitlab.ultrawares.com/ultrawares/ultrawares-project/new-website-frontend.git
- **API Base URL (Dev):** `https://newwebsite-dev-back.ultrawares.com`
- **Authentication Method:** —

Environments: **Staging** (dev branch auto-deploy)

---

## Environment Variables

```env
NEXT_PUBLIC_BASE_URL=https://newwebsite-dev-back.ultrawares.com
```

---

## Run Locally

```bash
pnpm install
pnpm dev
```

Other available scripts:

```bash
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix lint issues
pnpm format       # Format with Prettier
pnpm typecheck    # TypeScript type checking
```

---

## CI/CD & Branches

### Pipeline Tool: GitLab CI

| Branch | Environment | CI/CD |
|--------|-------------|-------|
| `main` | Stable / Production-ready | Manual merge only |
| `prod` | Production release | — |
| `dev` | Staging | Auto-deploy on push (port 3000) |


Flow:

```
feat-*  →  dev  →  main  →  prod
(build)  (test) (stable) (release)
```

- CI runner tagged: `server17`
- Deploy command: `docker compose up -d --build`
- Unused images pruned after each deploy

---

## Docker & Deployment

Multi-stage Dockerfile (Builder + Runner) using Node 24 slim.

```bash
docker compose -p <project>-<branch> up -d --build
```

| Setting | Value |
|---|---|
| Internal port | 3000 |
| Docker network | `ultrawares-net` (external) |
| Security | Caps dropped, no-new-privileges, read-only FS |

---

## Persistent Storage

This is a stateless Next.js frontend — no persistent volumes required.  
All assets are served from the built image. Uploads and media are managed by the backend.

---

## Ownership

- **Team:** Frontend Team
- **Maintainer:** Nazem Almsouti

---

## Notes

- RTL support configured via `stylis-plugin-rtl` for Arabic locale.
- Splash screen uses a custom `SplashContext` with asset-readiness detection before dismissal.
- Video frames are extracted at build time via `scripts/extract-video-frames.mjs` using `ffmpeg-static`.
- `.env` file must exist before running locally — use the `NEXT_PUBLIC_BASE_URL` value from docker-compose args as reference.
- Never push directly to `main` or `prod` — all changes go through reviewed merge requests targeting `dev`.
