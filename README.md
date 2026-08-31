# mrdigre.vercel.app

Manuel Digregorio's personal site — Astro + React islands + Tailwind, deployed on Vercel.

Content lives in `src/data/content.ts` (single source of truth for hero, skills, projects, experience, and the terminal easter-egg copy). Skills, experience, and project details render as static HTML at build time — the interactive terminal (`src/components/TerminalConsole.tsx`) is a bonus layer on top, not the only way to read them.

## Commands

| Command           | Action                              |
| :----------------- | :----------------------------------- |
| `npm install`       | Install dependencies                 |
| `npm run dev`       | Start local dev server (`:4321`)     |
| `npm run build`     | Build production site to `./dist/`   |
| `npm run preview`   | Preview the production build locally |
