# Overview

This is a **Critical Innovation & AI Pedagogy** academic website — a multi-page responsive web application for a research working group examining how artificial intelligence reshapes teaching, learning, and knowledge production. The site features multi-page routing with 7 standalone tabs, dark/light theme support, and an academic aesthetic. All site content is editable from a single configuration file (`client/src/content/site.ts`).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend (React SPA)

- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: `wouter` for client-side routing with 10 routes: `/` (home), `/about`, `/research`, `/projects`, `/toolkit`, `/people`, `/events`, `/publications`, `/collaborate`, `/contact`. Also `/insights` redirects to `/events` for backward compatibility.
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Icons**: lucide-react
- **State Management**: `@tanstack/react-query` for server state; React Context for theme
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode via class strategy)
- **Content**: All page content lives in `client/src/content/site.ts` — a single editable config object driving all sections
- **Component Structure**: Shared section components live in `client/src/components/sections/` (Navbar, Hero, Footer). Page components live in `client/src/pages/` (home, about, research, projects, toolkit, people, events, publications, collaborate, contact). Reusable UI primitives are in `client/src/components/ui/`. App.tsx provides a shared `PageLayout` wrapper (container + padding only, no title) for inner pages and a `ScrollToTop` component
- **Fonts**: DM Sans (sans), Libre Baskerville (serif), JetBrains Mono (mono) loaded via Google Fonts
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

## Backend (Express)

- **Runtime**: Node.js with Express 5
- **Dev server**: tsx runs TypeScript directly; Vite dev server is used as middleware for HMR
- **Production build**: Vite builds the client to `dist/public`; esbuild bundles the server to `dist/index.cjs`
- **API pattern**: All API routes should be prefixed with `/api` and registered in `server/routes.ts`
- **Static serving**: In production, Express serves the built client files and falls back to `index.html` for SPA routing

## Data Layer

- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` — currently has a `users` table with `id`, `username`, `password`
- **Validation**: `drizzle-zod` generates Zod schemas from Drizzle table definitions
- **Migrations**: Drizzle Kit with `db:push` command; migration output in `./migrations`
- **Storage abstraction**: `server/storage.ts` defines an `IStorage` interface with a `MemStorage` in-memory implementation. This should be swapped to a database-backed implementation (using Drizzle + PostgreSQL via `DATABASE_URL`) when the database is provisioned
- **Database URL**: Required via `DATABASE_URL` environment variable for Drizzle Kit config

## Theme System

- Light and dark modes via CSS custom properties on `:root` and `.dark` class
- `ThemeProvider` context component manages theme state, persists to localStorage, and toggles the class on `<html>`
- Custom color tokens: primary (deep blue), accent (warm amber), chart colors, card/popover variants with borders

## Build System

- **Dev**: `npm run dev` → tsx runs `server/index.ts` which sets up Vite middleware for HMR
- **Build**: `npm run build` → runs `script/build.ts` which does Vite client build + esbuild server bundle
- **Start**: `npm start` → runs the production bundle at `dist/index.cjs`
- **Type check**: `npm run check` → tsc with noEmit
- **DB push**: `npm run db:push` → drizzle-kit push

# Navigation Structure (7 Nav Items)

| Label | Route | Description |
|---|---|---|
| About | /about | Mission, Why Critical, Approach, People teaser |
| Research | /research | Overview stats, Pillar I & II focus areas |
| Projects | /projects | 4-pillar project cards, Student Research, Outputs, CTA |
| Toolkit | /toolkit | Open tools, Teaching resources, Curriculum, Experiments |
| People | /people | 4 community categories with member cards |
| Events | /events | Upcoming events, Research insights, Archive |
| Collaborate | /collaborate | 4 collaboration pathway cards |

# Site Content Keys (site.ts)

- `nav` — Navigation items and CTA button
- `hero` — Homepage hero (headline, subheadline, Venn circles)
- `about` — Mission, Why Critical (4 value cards), Approach
- `research` — Overview stats, Pillar I areas, Pillar II areas
- `projects` — Featured projects array (6 items), intro text
- `toolkit` — Open tools, teaching resources, curriculum, experiments
- `people` — 4 network categories with member arrays
- `events` — Insights array, upcoming events, archive
- `publications` — 5 publication categories with items
- `collaborate` — Headline, 4 collaboration categories
- `contact` — 3 contact categories
- `footer` — 3 footer columns with labels, bottom line text

# External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable. Used with Drizzle ORM for schema management and queries
- **Google Fonts**: External font loading (DM Sans, Libre Baskerville, JetBrains Mono, Fira Code, Geist Mono, Architects Daughter)
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` — development-only Replit integrations
- **shadcn/ui**: Component library configured via `components.json` with new-york style, Tailwind CSS variables, and path aliases
- **Session Store**: `connect-pg-simple` is available for PostgreSQL-backed session storage (not yet wired up)

# Design System Notes

- **Page headers**: Each page manages its own `h1` with a pattern: small uppercase label → large serif h1 → subtitle paragraph. PageLayout provides only the container padding.
- **Card pattern**: `hover-elevate` on cards, `no-default-active-elevate` on badges
- **Section rhythm**: Sections use `py-14 sm:py-16` with `<Separator />` between them
- **Layout pattern**: Many sections use `grid lg:grid-cols-4` with 1 col for label/intro and 3 cols for content
- **Color system**: primary = deep navy, accent = warm amber, chart-3 = green, chart-4 = purple
- **SVG colors**: Use inline `fill="hsl(var(--token) / opacity)"` not Tailwind className for SVG fill/stroke
