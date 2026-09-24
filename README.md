# Moodoo — lead-gen landing page

Idealoft build of the Moodoo waitlist page. Figma is the source of truth: file `0hJxVjyUUXUnL81whE0RCT`, frame `788:2`. See `ASSETS.md` for every asset's node.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind 4 · Motion · Supabase (server-only writes) · Vercel.

## Develop

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## Environment (Vercel → Settings → Environment Variables, Production + Preview)

| Name | Purpose |
|---|---|
| `SUPABASE_URL` | `https://swawpzsacylgudxpnjoz.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role. Server only; never `NEXT_PUBLIC_`. |
| `WAITLIST_FORM_SECRET` | ≥32 chars, signs the form timing token (`openssl rand -base64 48`). |
| `CRON_SECRET` | Vercel sends it as a Bearer token to the cron route (`openssl rand -base64 32`). |

## How it works

- **Choreography** (`HeroWhatStage.tsx`) — one phone for hero + "What is Moodoo". It pins at its hero position; the panel rises under it; the hand-off is scroll-scrubbed (x −10px, idle drift decays to rest at −1°, the right chip glides 138px and morphs Manager → Customer Support). Chapters activate from a reading line in the phone's lower third; screens crossfade in 200ms; inactive chapters sit at 0.32 opacity (Figma value).
- **Personas** (`Personas.tsx`) — pinned stage; the card column steps 516px per card with dwell plateaus, so each card rests exactly as in the Figma state frames.
- **Mandalas** — phone pins within its section with pure CSS sticky.
- **Nav** — tint follows the section under the pill via each section's `data-nav-tint`.
- **Waitlist** (`app/actions/waitlist.ts`) — server action → `public.waitlist_leads` with the service role. The page stays static: a fresh HMAC-signed timing token is fetched on mount; submissions under 2.5s or over 6h are rejected (fast ones silently). Honeypot `company_website`. The unique `lower(work_email)` violation (23505) shows "You're already on the list". Zod mirrors the table's CHECK constraints. UTM params and referrer are stamped at submit.
- **Keep-alive** — `vercel.json` cron hits `/api/cron/keepalive` daily at 06:17 UTC (Hobby allows one run a day).
- **Fonts** — Manrope and DM Sans, self-hosted from Fontsource via `next/font/local`. No Google requests at build or runtime.
