// ads.js — advertising configuration.
//
// HOW TO GO LIVE WITH REAL ADS:
// 1. Get a custom domain (~$10/yr) and point it at this site (GitHub Pages supports this
//    under Settings → Pages → Custom domain). AdSense generally rejects free subdomains.
// 2. Apply at https://adsense.google.com with your domain. Approval can take days–weeks.
// 3. Once approved, paste your publisher ID below (looks like "ca-pub-1234567890123456").
// 4. Optionally create display ad units in AdSense and paste their slot IDs; if you leave
//    slots empty, Auto Ads formatting is used.
//
// Until adsenseClient is set, the slots render as tasteful themed placeholders so you can
// see exactly where ads will appear.

window.ADS = {
  // Your AdSense publisher ID, e.g. "ca-pub-1234567890123456". Empty = show placeholders.
  adsenseClient: "",

  // Optional: specific ad unit slot IDs from your AdSense dashboard.
  slots: {
    banner: "",   // leaderboard under the tabs
    grid: "",     // in-feed cards inside the news grid
  },

  // Insert one ad card into the news grid every N stories.
  gridFrequency: 10,

  // Master switch — set to false to hide all ad slots entirely.
  enabled: true,
};
