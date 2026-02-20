# Overview

This is a **Critical Innovation & AI Pedagogy** academic homepage — a single-page responsive web application for a research working group examining how artificial intelligence reshapes teaching, learning, and knowledge production. The site features section-based anchor navigation, dark/light theme support, and an academic aesthetic. All site content is editable from a single configuration file (`client/src/content/site.ts`).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend (React SPA)

- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: `wouter` for client-side routing (currently just `/` and a 404 page)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS
- **Icons**: lucide-react
- **State Management**: `@tanstack/react-query` for server state; React Context for theme
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode via class strategy)
- **Content**: All page content lives in `client/src/content/site.ts` — a single editable config object driving all sections
- **Component Structure**: Section components live in `client/src/components/sections/` (Navbar, Hero, Pillars, ResearchInAction, Publications, Resources, InsightsEvents, CTASection, Footer). Reusable UI primitives are in `client/src/components/ui/`
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

# External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable. Used with Drizzle ORM for schema management and queries
- **Google Fonts**: External font loading (DM Sans, Libre Baskerville, JetBrains Mono, Fira Code, Geist Mono, Architects Daughter)
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` — development-only Replit integrations
- **shadcn/ui**: Component library configured via `components.json` with new-york style, Tailwind CSS variables, and path aliases
- **Session Store**: `connect-pg-simple` is available for PostgreSQL-backed session storage (not yet wired up)