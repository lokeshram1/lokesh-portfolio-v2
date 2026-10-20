# Lokesh Ram Hariram — Portfolio

A responsive portfolio built with Next.js 16, React 19, and TypeScript. The page uses the reference site's full-screen section navigation, quiet monochrome palette, circular line art, and hover details, with content sourced from Lokesh's résumé.

## Local development

Requirements: Node.js 20.9 or newer and pnpm 10 or newer.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Deploy to Vercel

1. Push this project to a new Git repository.
2. Import that repository in Vercel and keep the detected Next.js settings.
3. Deploy. No environment variables are required.

Vercel will use `pnpm build` for the production build and `pnpm start` for a Node.js deployment elsewhere.

## Content notes

- Profile URLs, experience dates, education dates, skills, and project descriptions are taken from the supplied résumé.
- Project source/demo URLs were not listed in the résumé, so the project cards do not link to unverified destinations.
- The circular hero portrait uses the supplied photo stored locally at `public/profile.jpg`.
