# Neon + Blob + Admin setup for Lisle

## 1. Neon
1. Create a project at https://console.neon.tech
2. Copy the connection string (`DATABASE_URL`)
3. In Neon SQL Editor, run `sql/schema.sql` (optional — the API also auto-creates tables)
4. Add `DATABASE_URL` to Vercel project env vars and to local `.env`

## 2. Vercel Blob (photos)
1. Vercel Dashboard → Storage → Create Blob store
2. Copy `BLOB_READ_WRITE_TOKEN`
3. Add it to Vercel env + local `.env`

## 3. Admin password
Set the same value in:
- `VITE_ADMIN_PASSWORD` (login in the browser)
- `ADMIN_PASSWORD` (API writes)

Default if unset: `lisle-familia` — change it before sharing the site.

## 4. Local development with API
```bash
npm i -g vercel
vercel link
vercel env pull .env.local
npx vercel dev
```

`vercel dev` serves the Vite app and `/api/*` together.

Without Neon/API, the admin still works in local-only mode (this browser).

## 5. Deploy
Push to GitHub / `vercel --prod` and set the env vars in the Vercel project.
