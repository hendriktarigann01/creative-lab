# Creative Lab - High-Fidelity Interactive Showcase

A premium, highly interactive Next.js web application built for the **Creative Lab** landing page. It showcases high-fidelity software engineering and physical interactive installations with smooth scroll mechanics, immersive animations, and dynamic localization.

---

## Key Features

### 1. Parallax Scroll & Timeline Warping
- Synchronized WebM video scrubbing matched with overlay text fading.
- **Timeline Warping (`getWarpedProgress`)**: Maps linear scroll input to a non-linear timeline, keeping text sequences completely static on active states and scrolling rapidly during transitions ("scroll cepat").

### 2. Gesture-Based Scroll Snapping ("Stopper Scroll")
- **Threshold Snapping**: A state-machine listener (`useLenis`) monitors scroll direction and distance. A single small trackpad swipe or mouse wheel tick (threshold of `0.02` progress) initiates a smooth, stately programmatical snap to the next sequence state.
- **Easing & Duration**: Uses a custom ease-out curve over `1.3s` to deliver a buttery-smooth, premium slide transition.
- **Auto-Disable**: Automatically disables snapping once the user scrolls past the Hero intro (`progress > 0.92`), allowing free scrolling through the rest of the page.
- **Fallback Recovery**: Automatically snaps back to the current active step if a scroll gesture does not cross the transition threshold.

### 3. Modular Branding Components
- **Reusable `PageHero`**: Unified top hero sections across all subpages featuring:
  - Custom brand gradient word highlighting.
  - Breadcrumb navigation or interactive back buttons.
  - Custom ambient glow backdrops.

### 4. Internationalization (i18n)
- Powered by `next-intl` to support localized sub-routing (`/[locale]/...`).
- Built-in configurations for English (`en`) and Indonesian (`id`).

---

## Technology Stack

- **Core**: Next.js 16.2 (App Router, Turbopack) & React 19
- **Scroll Engine**: Lenis (`lenis/react`) for smooth scrolling orchestration
- **Animations**: Motion (`motion/react`)
- **Styling**: Tailwind CSS v4 with custom utility patterns
- **Internationalization**: `next-intl`

---

## Project Structure

```text
├── src/
│   ├── app/
│   │   ├── [locale]/           # Localized pages (Home, Services, Portfolio, etc.)
│   │   │   └── layout.tsx
│   │   │   └── page.tsx
│   │   │   └── not-found.tsx
│   │   └── middleware.ts       # next-intl language redirect routing
│   ├── components/
│   │   ├── layout/             # Navigation and Footer components
│   │   ├── sections/           # Interactive homepage sections (Hero, Services, Contact, etc.)
│   │   └── ui/                 # Reusable ui components (Button, PageHero, Container)
│   ├── data/
│   │   ├── en/ & id/           # Localized translation resource files (common.json)
│   │   └── metadata.ts         # Global SEO metadata configuration
│   └── lib/
│       ├── hero-utils.ts       # Hero scroll style interpolations
│       └── structured-data.ts  # JSON-LD Schema generators for search engines
├── public/                     # Static media, parallax videos, and icons
├── package.json
└── next.config.ts
```

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Verification
Compile the optimized production bundle and check for static generation compatibility:
```bash
npm run build
```

### 4. Run Production Server Locally
```bash
npm run start
```

---

## Deployment Options

Since this project uses server-side localization middleware (`middleware.ts`) and dynamic routing, it cannot be hosted directly as static HTML without modifications.

### Option A: Standard Node.js Server (Recommended)
Host the app on platforms supporting Node.js runtimes (e.g., Vercel, VPS, or cPanel Node.js Application manager):
1. Run `npm run build` to generate the `.next` production package.
2. Run `npm run start` to start the Node.js web server.

### Option B: Static HTML Export (Apache / Nginx)
If you require deployment on standard static hosting (like uploading a zip to `public_html` under cPanel file manager):
1. Add `output: 'export'` to your `next.config.ts`.
2. Please note: Next.js middleware and dynamic routes do **not** work in static export mode. You must remove/bypass `middleware.ts` and handle locale redirection via server config files (e.g., `.htaccess` on Apache or `nginx.conf` on Nginx).
3. Run `npm run build` which will generate an `out/` folder.
4. Compress the contents of `out/` into a zip file, upload it to your hosting directory, and extract it.
