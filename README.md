# Portfolio — Anton Shevchenko

Personal developer portfolio built with Astro, React, and TypeScript. Features a Spotify now-playing widget, interactive project demos, a typing game, and a light/dark theme.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 6 (SSR) |
| UI | React 19, TypeScript |
| Styling | CSS (custom properties, no framework) |
| Deployment | Vercel |
| API | Spotify Web API (now-playing widget) |

---

## Project Structure

```
src/
├── components/
│   ├── sections/        # Page sections (Hero, Projects, TechStack, Timeline, FunZone, Contact)
│   └── ui/              # Shared UI components (Nav)
├── data/
│   ├── projects.ts      # Project cards content
│   └── timeline.ts      # Timeline entries
├── layouts/
│   └── layout.astro     # Base HTML layout (meta, OG tags)
├── pages/
│   ├── index.astro      # Main page
│   └── api/
│       └── spotify.ts   # Spotify now-playing endpoint
└── styles/              # Global and section CSS
public/
├── og.png               # OG preview image (1200x630)
├── robots.txt
├── favicon.svg
└── *.png                # Project screenshots
```

---

## Getting Started

### Prerequisites

- Node.js `>=22.12.0`
- A Spotify app with a refresh token ([guide](https://developer.spotify.com/documentation/web-api))

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your Spotify credentials
cp .env.example .env

# 3. Start dev server
npm run dev
```

### Environment Variables

```env
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

### Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Featured Projects

### Student Helper
AI-powered exam preparation platform. Microservices backend (NestJS, Turborepo), Google Gemini 2.5 Flash for quiz/flashcard generation, OCR via Tesseract.js, PostgreSQL + AWS S3, Docker.

### MovieChecklist
Native Android watchlist app. MVVM + Jetpack Compose, Firebase Auth & Firestore, TMDB API, Room Database, WorkManager push notifications.

### Natours
Full-stack tour booking platform. Node.js + Express, MongoDB, Stripe payments, JWT auth, server-side rendering with Pug templates.

---

## Deployment

Deployed on **Vercel** with SSR adapter. Set the environment variables in the Vercel dashboard before deploying.

Once you have a domain, update:
- `SITE_URL` in `astro.config.mjs`
- `Sitemap:` line in `public/robots.txt`

---

## License

MIT
