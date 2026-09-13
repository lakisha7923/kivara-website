# Kivara Healthcare

Mobile-first healthcare shift marketplace connecting facilities with licensed professionals.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 4317 --hostname 0.0.0.0
```

Open [http://127.0.0.1:4317](http://127.0.0.1:4317).

## Site URL

Put your live website URL in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-real-site-url.com
```

Examples:
- `https://kivara.vercel.app`
- `https://www.kivara.health`

Then restart the app. Your homepage, CNA app, and Facility app will use that URL.

## Stack

- Next.js + TypeScript + Tailwind
- Firebase Auth, Firestore, Storage

## Apps

- **CNA mobile app:** [http://127.0.0.1:4317/cna](http://127.0.0.1:4317/cna)
- **Facility mobile app:** [http://127.0.0.1:4317/facility](http://127.0.0.1:4317/facility)
- **Admin portal:** [http://127.0.0.1:4317/admin](http://127.0.0.1:4317/admin)

## Product direction

Kivara is building toward an on-demand shift marketplace: facilities request coverage, CNAs pick up eligible shifts, credentials and GPS timekeeping stay in sync, and billing closes the loop — with phone-first apps for both sides.
