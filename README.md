# CodeCraft Landing Page

Landing page for **CodeCraft** by IIE Tech Club (Ideal Institute of Engineering), built with Astro and Tailwind CSS.

The site presents event highlights, timeline, rules, submission details, organizer profiles, and contact info with a neon, futuristic UI.

## Live Demo

https://code-craft-landing-page-alpha.vercel.app/

## Tech Stack

- Astro 5
- Tailwind CSS 3
- PostCSS + Autoprefixer
- Vanilla JS for interactive behavior (loader, countdown, reveal effects, modal interactions)

## Key Features

- Animated hero with countdown and glowing visual effects
- Scroll-aware navbar and responsive menu behavior
- Timeline section with custom curved path layout
- Prizes, rules, and submission sections with reusable data-driven rendering
- Organizer showcase cards
- Contact section with quick tap-to-call links
- Registration modal and reveal-on-scroll transitions

## Project Structure

```text
/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── svg/
│   ├── components/
│   │   └── Navbar.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       ├── global.css
│       ├── index.css
│       └── nav.css
├── astro.config.mjs
├── tailwind.config.mjs
├── postcss.config.mjs
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- pnpm (recommended) or npm

### Install

```bash
pnpm install
```

Or:

```bash
npm install
```

### Run Development Server

```bash
pnpm dev
```

Open: `http://localhost:4321`

## Scripts

| Script | Command | Description |
| :-- | :-- | :-- |
| Dev | `pnpm dev` | Start local dev server |
| Build | `pnpm build` | Build static output to `dist/` |
| Preview | `pnpm preview` | Preview production build locally |
| Astro CLI | `pnpm astro` | Run Astro CLI commands |

## Content Editing Guide

Most site content is managed at the top of `src/pages/index.astro`:

- `timeline` for event schedule
- `prizes` for prize cards
- `rules` for participation rules
- `submissionRequirements` for submission cards
- `organizers` for organizer profiles

Layout and styling:

- Core styles: `src/styles/global.css`
- Navbar component: `src/components/Navbar.astro`
- Design tokens: `tailwind.config.mjs`

## Build and Deployment

Create production build:

```bash
pnpm build
```

Preview build:

```bash
pnpm preview
```

Deploy the generated `dist/` directory to your static hosting provider.

## Notes

- Timeline icons can be emoji, image paths, or imported SVG components.
- If you update timeline icon rendering logic, avoid forcing all icon types into a URL string to prevent `404` path lookups.
