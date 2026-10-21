# Lokesh Ram Hariram — Portfolio

A responsive portfolio built with Next.js 16, React 19, and TypeScript. The page uses the reference site's full-screen hero, natural-scroll section navigation, quiet monochrome palette, circular line art, and hover details, with content sourced from Lokesh's résumé.

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

1. Import this repository in Vercel and keep the detected Next.js settings.
2. In the Vercel project's **Settings → Domains**, use the actual production domain assigned to this new portfolio.
3. Add `NEXT_PUBLIC_SITE_URL` under **Settings → Environment Variables** with that domain's full HTTPS origin (for example, the actual `https://…` domain shown in Vercel; do not use localhost or the old portfolio URL).
4. Redeploy after setting the variable so the canonical, Open Graph, and Twitter metadata include the production URL and absolute preview image URL.

For local development, put the same value in `.env.local` after the production domain exists. The key is shown in `.env.example`. If the variable is unset, the app still builds, but it intentionally omits canonical and absolute share URLs rather than guessing a domain.

Vercel will use `pnpm build` for the production build and `pnpm start` for a Node.js deployment elsewhere.

## Content notes

- Profile URLs, experience dates, education dates, skills, and project descriptions are taken from the supplied résumé.
- Project source/demo URLs were not listed in the résumé, so the project cards do not link to unverified destinations.
- The circular hero portrait uses the supplied photo stored locally at `public/profile.jpg`.
