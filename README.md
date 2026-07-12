# NEXUS — Gaming & Anime News Dashboard

A single-page, live news dashboard for gamers and anime fans. It aggregates **gaming news,
anime & manga, deals & giveaways, and trailers/video** from free public RSS feeds — no API keys,
no accounts, no backend.

## Run it

**Easiest:** double-click `index.html` to open it in your browser.

**Recommended (proper origin, fewer proxy quirks):**

```bash
npx serve .
# then open the printed http://localhost:3000
```

Any static file server works (`python -m http.server`, VS Code Live Server, etc.).

## How it works

- `index.html` – page shell (header, tabs, search, grid)
- `styles.css` – dark neon theme, responsive card grid
- `feeds.js` – **the list of news sources** (edit this to customize)
- `app.js` – fetches each feed through a free proxy, parses the response, then merges,
  de-duplicates (by normalized title, so the same story from multiple outlets collapses),
  sorts newest-first, and renders cards. Requests are run at limited concurrency so the free
  proxies don't rate-limit us. Results are cached in `localStorage` for 15 minutes so reloads
  are instant and content still shows if a source is temporarily down. Feeds auto-refresh every
  15 minutes, or hit **Refresh**.

Because browsers block direct cross-origin RSS fetches (CORS), feeds are routed through public
proxies, tried in order until one succeeds:
1. **rss2json** (primary) – returns clean, normalized JSON; the most reliable option.
2. **allorigins** / **codetabs** – return raw XML, parsed in-browser as a fallback.

Each category is also anchored by a **Google News** query feed. Google News is far more
proxy-friendly than Reddit or YouTube (which proxies often block), so even on a bad day no
category goes empty. Reddit/YouTube feeds are included as *bonus* sources that show up when
they can.

## Add or remove news sources

Edit `feeds.js` — each source is one line:

```js
{ name: "IGN", category: "gaming", url: "https://www.ign.com/rss/articles" },
```

- `category` must be one of: `gaming`, `anime`, `deals`, `trailers`
- `url` is any public RSS/Atom feed
- Reddit: append `.rss` to a subreddit → `https://www.reddit.com/r/SUBREDDIT/.rss`
- YouTube channel: `https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID`

## Advertisements

The layout has built-in ad slots: a leaderboard banner under the tabs and an in-feed ad card
every 10 stories. They show themed placeholders until you connect Google AdSense:

1. Get a custom domain (~$10/yr) — AdSense generally rejects free subdomains like
   `username.github.io`.
2. Apply at [adsense.google.com](https://adsense.google.com) with your domain (approval can
   take days–weeks and requires original content policies — review their program policies).
3. Paste your publisher ID (`ca-pub-…`) into `ads.js` → `adsenseClient`. Done — real ads
   replace the placeholders automatically.

Tune placement in `ads.js` (`gridFrequency`, per-slot IDs, or `enabled: false` to hide ads).

## Host it for free

It's a static site — drag the folder onto **Netlify Drop**, push to **GitHub Pages**, or deploy to
**Cloudflare Pages**. No build step required.

## Note on reliability

Public CORS proxies are free but can rate-limit or go down. The multi-proxy fallback plus the
local cache handles most hiccups. If you later want rock-solid uptime, the natural upgrade is a
tiny Node/serverless script that fetches the feeds server-side into a `news.json` the page reads —
the UI wouldn't need to change.
