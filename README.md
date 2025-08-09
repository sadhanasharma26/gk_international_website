## GK International Website

Next.js + Tailwind site for GK International, with dynamic products imported from the IndiaMART reference page.

Scripts:
- `npm run scrape:puppeteer` — refresh `src/data/products.json` from IndiaMART
- `npm run build` — production build

Deploy on Vercel:
1. Push to GitHub
2. Import on Vercel → Next.js auto-detected → Deploy
3. Add custom domain in Project → Settings → Domains
