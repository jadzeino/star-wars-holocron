# Star Wars Holocron — Coding Challenge

> **Challenge Prompt:** "Please implement a Star Wars–themed React app. The app should connect to the SWAPI and display the retrieved data. Please do not spend more than 4–8 hours on this. Keep the design effort minimal and take a pragmatic approach to the app's design. If you need to simplify any part of the implementation or make assumptions due to time constraints, please note them and share when presenting your solution."

---

## 🔗 Live Demo

> **[https://jadzeino.github.io/star-wars-holocron/](https://jadzeino.github.io/star-wars-holocron/)**

---

## 📖 What Is This App?

**Star Wars Holocron** is a galactic database terminal — a knowledge base explorer for the Star Wars universe. In Star Wars lore, a **Holocron** is an ancient data storage device used by Jedi and Sith to preserve knowledge across generations. I chose this concept because it perfectly frames the app as a **data terminal** — a place where you access and browse structured records about people, films, planets, species, starships, and vehicles.

The app connects to the [Star Wars API (SWAPI)](https://swapi.py4e.com/documentation) and presents the data through a sci-fi terminal aesthetic, treating each API resource category as a "sector" that users can explore.

---

## 🏗 Tech Stack & Reasoning

### Why Vite (and not Next.js)?

I chose **Vite** as the build tool for several reasons:

- **Speed:** Vite offers near-instant HMR and fast cold starts, which made the development experience extremely productive within a time-limited challenge.
- **Simplicity:** For a purely client-side SPA that consumes a third-party API, Vite is the right tool. There's no need for SSR, API routes, or file-based routing that Next.js provides.
- **Lightweight:** Zero framework overhead — just React + a fast bundler.

**Where Next.js could excel:** If this app needed SEO-critical server-rendered pages, ISR/SSG for caching SWAPI responses at build time, or API routes for server-side logic (e.g., proxying SWAPI to avoid CORS or rate limits), Next.js would be the better choice. However, for a time-boxed coding challenge with a simple client-side data fetching pattern, Next.js would be overkill — it adds complexity (server components, routing conventions, deployment considerations) without meaningful benefit here.

### Why Tailwind CSS?

- **Rapid prototyping:** Utility-first CSS allowed me to build a polished, themed UI extremely fast without writing custom stylesheets.
- **Design system via CSS variables:** All colours are defined as HSL semantic tokens (e.g., `--background`, `--foreground`, `--accent`) in `index.css`, consumed by Tailwind via `tailwind.config.ts`. This enables the dark/light theme toggle with zero duplication.
- **Consistency:** Tailwind enforces consistent spacing, typography, and responsive breakpoints out of the box.

### Why shadcn/ui?

- **Native components:** shadcn/ui provides unstyled, accessible component primitives (Sidebar, Tooltip, etc.) that I own and can customise. No black-box dependencies.
- **Radix UI primitives underneath:** Built on battle-tested accessible primitives from Radix, giving me proper ARIA support, keyboard navigation, and focus management for free.
- **Tailwind-native:** Components are styled with Tailwind classes, keeping everything in one styling paradigm.

### Core Dependencies

| Package | Purpose |
|---|---|
| **React 18** | UI library |
| **TypeScript** | Type safety across the entire codebase |
| **React Router DOM v6** | Client-side routing with URL params and search params |
| **TanStack React Query v5** | Data fetching, caching, deduplication, and stale-while-revalidate |
| **Zod** | Runtime schema validation for API responses |
| **Framer Motion** | Page transitions and micro-animations |
| **Lucide React** | Consistent, tree-shakeable icon set |
| **Tailwind CSS** | Utility-first styling |
| **tailwindcss-animate** | Animation utilities for Tailwind |
| **class-variance-authority** | Component variant management |
| **clsx + tailwind-merge** | Conditional class merging without conflicts |

### Dev Dependencies

| Package | Purpose |
|---|---|
| **Vitest** | Unit testing framework (Vite-native) |
| **@testing-library/react** | Component testing utilities |
| **@testing-library/jest-dom** | Extended DOM matchers |
| **Playwright** | End-to-end browser testing |
| **ESLint + typescript-eslint** | Linting and code quality |
| **jsdom** | Browser environment simulation for tests |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui primitives (Sidebar, Tooltip, etc.)
│   ├── AppSidebar.tsx   # Main navigation sidebar with resource sectors
│   ├── Topbar.tsx       # Top bar with search, theme/music/rounded toggles
│   ├── Datacard.tsx     # Reusable card for resource list items
│   ├── Pagination.tsx   # Pagination with prev/next and jump-to-page
│   ├── RelatedSection.tsx # Expandable related resource links (lazy-loaded)
│   ├── OpeningCrawl.tsx # Animated Star Wars opening crawl for films
│   ├── StatusStates.tsx # Loading, Error, and Empty state components
│   ├── ResourceIcon.tsx # Maps resource types to Lucide icons
│   └── NavLink.tsx      # NavLink wrapper with active class support
├── hooks/
│   ├── useResource.ts   # React Query hooks for SWAPI data fetching
│   ├── useTheme.ts      # Dark/light theme toggle with persistence
│   ├── useBackgroundMusic.ts # Background music player (singleton audio)
│   ├── useRoundedMode.ts    # Sharp/rounded corner toggle
│   ├── useDebounce.ts       # Debounce hook for search input
│   └── usePageSEO.ts       # Dynamic document title, meta tags, and JSON-LD
├── lib/
│   └── swapi.ts         # SWAPI client, Zod schemas, and helper utilities
├── pages/
│   ├── HomePage.tsx     # Landing page with sector grid
│   ├── ResourceList.tsx # Paginated, searchable resource listing
│   ├── ResourceDetail.tsx # Individual resource detail view
│   └── NotFound.tsx     # 404 page
├── test/                # Unit tests mirroring src structure
│   ├── components/      # Component tests (Datacard, Pagination, etc.)
│   ├── hooks/           # Hook tests (useTheme, useRoundedMode, etc.)
│   └── lib/             # Utility/library tests
├── App.tsx              # Root component with routing and providers
└── index.css            # Design tokens, custom CSS, animations
e2e/                     # Playwright E2E test specs
├── mocks/
│   └── swapi-data.ts    # Mocked API Data 
├── home.spec.ts
├── navigation.spec.ts
├── pagination.spec.ts
├── resource-detail.spec.ts
├── resource-list.spec.ts
└── search.spec.ts
```

### Component Reusability

- **`Datacard`** — Used across all six resource types. It dynamically extracts display fields from any SWAPI record using helper functions (`getDisplayName`, `getDataFields`), so it works for people, films, planets, etc. without any resource-specific logic.
- **`StatusStates`** — Three states (`ScanningLoader`, `ErrorState`, `EmptyState`) reused on every page. Consistent loading/error UX across the app.
- **`ResourceIcon`** — Maps resource type strings to Lucide icon components. Used in the sidebar, list headers, and detail pages.
- **`RelatedSection`** — Expandable component for linked resources. Lazy-loads related data only when expanded to avoid unnecessary API calls.
- **`Pagination`** — Generic pagination with prev/next, record count, and jump-to-page. URL-driven via search params.
- **`Topbar`** — Configurable top bar that optionally shows search and always shows theme/music/rounded controls.

---

## 🎨 Design & Layout

### Visual Direction

The design follows a **sci-fi terminal aesthetic** — think military data terminals from the Star Wars universe. Key design decisions:

- **Dark theme (default):** Deep blue-black backgrounds with amber/gold accents (`hsl(47, 100%, 56%)`), evoking classic Star Wars colour language.
- **Light theme:** Clean blue-grey tones with orange accents, maintaining the same sci-fi feel without being jarring.
- **Scanline overlay:** A subtle CRT scanline effect over the entire viewport (purely decorative, `pointer-events: none`).
- **Targeting brackets:** Datacards feature animated corner brackets on hover, inspired by targeting HUD elements.
- **Tactical typography:** Labels use `JetBrains Mono` in uppercase with wide letter-spacing, mimicking military readout text.

### Font Choice

The display font used is **Orbitron** — not the classic "Star Wars" font. I deliberately chose Orbitron because it's a geometric, futuristic typeface that feels more coherent with the **data terminal** concept. The app isn't trying to replicate a movie poster; it's a **database interface**, and Orbitron's clean geometry paired with JetBrains Mono for body text creates a technical, systematic aesthetic that better serves the Holocron concept.

### Layout

- **Sidebar + Content:** Collapsible sidebar (via shadcn/ui `Sidebar`) showing all six resource sectors, with a main content area.
- **Responsive grid:** Resource lists use a responsive grid (`1 → 2 → 3 columns`) based on viewport width.
- **URL-driven state:** Page number and search terms are synced to URL search params, enabling deep linking and browser back/forward navigation.

---

## ✨ Features

### Core Features
- **Browse all six SWAPI resources:** People, Films, Planets, Species, Starships, Vehicles
- **Paginated lists** with total count display and jump-to-page functionality
- **Search** with debounced input (300ms) to avoid excessive API calls
- **Detail pages** with all resource fields and expandable related resource links
- **Opening Crawl** for films — animated CSS Star Wars–style crawl with pause/resume/replay controls

### UX Features
- **Dark/Light theme toggle** — persisted in `localStorage`
- **Rounded/Sharp corners toggle** — switches `--radius` CSS variable between `0.125rem` and `0.75rem`, persisted in `localStorage`
- **Background music** — Ambient background music player with play/stop controls in the top bar. Note: it's a fan-made piece inspired by the universe to avoid any licensing concerns.
- **Smooth page transitions** — Framer Motion animations on route changes and list item renders
- **Collapsible sidebar** — Icon-only mode for more content space

### Input Security

- **Input sanitisation:** All search input is passed through a `sanitizeSearchInput` utility (`src/lib/sanitize.ts`) that strips HTML/script tags, removes dangerous characters, and enforces a hard **100-character limit**.
- **`maxLength` attribute:** The HTML `<input>` element itself also has `maxLength={100}` as a first line of defence before JavaScript even fires.
- **No `dangerouslySetInnerHTML`:** Search values and all API data are rendered as React text nodes, not raw HTML, preventing XSS by default.
- **Debounced requests:** The 300ms debounce acts as basic client-side rate limiting.

---

## 🔍 Zod Usage

All SWAPI responses are validated at runtime using **Zod schemas** (`src/lib/swapi.ts`). Each of the six resource types has a dedicated schema that defines the exact shape of the API response.

**Why this matters:**
- **Runtime safety:** SWAPI is a third-party API — its responses could change. Zod catches malformed responses immediately.
- **Type inference:** Zod schemas generate TypeScript types automatically via `z.infer<>`.
- **Documentation:** The schemas serve as living documentation of the API contract.

---

## ♿ Accessibility & WCAG Compliance

The app follows **WCAG 2.1 AA** guidelines:

- **Semantic HTML:** `<main>`, `<header>`, `<nav>`, `<section>` used throughout.
- **ARIA attributes:** `role="banner"`, `role="navigation"`, `role="status"`, `role="alert"`, `aria-label` used on interactive elements.
- **Keyboard navigation:** All interactive elements are focusable with visible focus rings.
- **Screen reader support:** `sr-only` class used for labels.
- **Reduced motion:** The animated opening crawl provides a static text alternative.

---

## ⚡ Performance & Optimisation

### Lighthouse Scores

![Lighthouse Scores](public/images/lighthouse-scores.png)

- **React Query caching:** API responses are cached with `staleTime` (5–10 minutes).
- **Lazy-loaded related resources:** `RelatedSection` only fetches linked resources when the user expands the section.
- **Debounced search:** 300ms debounce on search input.
- **Singleton audio instance:** Background music uses a module-level `Audio` object shared across hook instances.

### SEO

- **Dynamic `<title>` and `<meta description>`** per page via `usePageSEO` hook
- **JSON-LD structured data** for Films (Movie schema), People (Person schema), and Planets (Place schema)
- **Open Graph and Twitter Card meta tags** in `index.html`
- **Canonical URL** tag
- **`robots.txt`** and **`sitemap.xml`** included

---

## 🧪 Testing

### Unit Tests (Vitest + React Testing Library)

56 tests covering Components (`Datacard`, `OpeningCrawl`, etc.), Hooks (`useTheme`, `useDebounce`, etc.), and Libraries (SWAPI client logic).

Run unit tests:
```bash
npm test
```

### E2E Tests (Playwright)

6 test specs covering full user flows from landing, searching, paginating, to viewing deep resources.
**Mocked API Data:** All E2E tests run against deterministic mock data (`e2e/mocks/swapi-data.ts`) via Playwright's `page.route()` interception to guarantee reliability.

Run E2E tests:
```bash
npx playwright test
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/jadzeino/star-wars-holocron.git

# Navigate to the project directory
cd star-wars-holocron

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Deployment (GitHub Pages)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys to GitHub Pages on every push to `main`.

To enable it:
1. Go to your repo **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — the workflow will deploy to `https://jadzeino.github.io/star-wars-holocron/`

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run E2E tests

---

## 🤖 AI-Assisted Development

I used AI as a collaborative tool throughout the development process:

- **Brainstorming & ideation:** I used AI to brainstorm architectural approaches, explore feature ideas, and generate initial design concepts and mocks. This helped me quickly evaluate different directions before committing to the Holocron terminal concept.
- **Mock data generation:** The deterministic E2E mock data (`e2e/mocks/swapi-data.ts`) was generated with AI assistance. Rather than manually crafting dozens of mock records, I automated the generation of realistic SWAPI-shaped fixtures, saving significant time while ensuring comprehensive coverage.
- **Test authoring:** I leveraged AI to draft some of the E2E and unit tests. Every generated test was **reviewed, validated, and refined** by me to ensure the assertions are meaningful, the coverage targets the right behaviours, and the tests are robust against false positives.

AI was used as an accelerator — not a replacement for engineering judgement. All output was critically reviewed and adapted to fit the project's standards.

---

## 📝 Assumptions & Simplifications

- **No server-side rendering:** Since SWAPI is a public API with no authentication, client-side fetching is sufficient for this scope.
- **10 items per page:** SWAPI returns 10 results per page by default; I didn't implement custom page sizes.
- **No global state management:** React Query handles server state; local UI state (theme, music, rounded mode) is managed via hooks + `localStorage`. 
- **No image assets:** SWAPI doesn't provide images, so the app relies on typography, icons, and layout for visual interest.
- **No `.env` for API URL:** The SWAPI base URL is hardcoded in the client rather than stored in an environment variable. This was a deliberate simplification for this challenge.
- **SWAPI mirror:** The app uses `swapi.py4e.com` as the API base URL — the faster, more reliable mirror of the original `swapi.dev`.
