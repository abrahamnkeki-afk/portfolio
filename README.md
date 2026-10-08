# Abraham Nkeki Thlama portfolio

Site: HTML, CSS, JavaScript. Backend: one Cloudflare Worker with KV storage for articles.

## Layout (repo top level)
- `wrangler.jsonc`  Cloudflare config
- `worker.js`       backend: article API and article pages at `/writing/<slug>`
- `README.md`
- `public/`         the website: index.html, admin.html, style.css, data.js (your content), main.js, robots.txt, sitemap.xml

## Deploy from GitHub to Cloudflare
1. Upload the three top-level files and the `public` folder to the repo.
2. The KV namespace ID is already in `wrangler.jsonc`. The binding name must stay `KV_BINDING`.
3. Workers & Pages > Create > Import a repository. The Worker name is `portfolio` and must match `"name"` in `wrangler.jsonc`. Never set the assets directory to `.`, because that publishes the hidden `.git` folder. Build command empty. Deploy command: `npx wrangler deploy`.
4. Worker > Settings > Variables and Secrets > add Secret `ADMIN_TOKEN` (20+ random characters, kept in a password manager, never in GitHub).
5. Open `https://<your-worker>.workers.dev/admin.html`, enter the token, publish an article.
6. Every push to GitHub redeploys.

## Custom domain
Worker > Settings > Domains & Routes > Add custom domain. Then uncomment the two marked lines in `public/index.html`.

## Security
- Only requests with the correct token can publish or delete. Article text is escaped before display.
- Add a Cloudflare rate limiting rule for `/api/*`. Consider Cloudflare Access for `/admin.html`.
- New or deleted articles can take up to a minute to show (KV caching). Reusing a title replaces that article.
