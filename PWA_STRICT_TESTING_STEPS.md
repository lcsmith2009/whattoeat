# WhatToEat PWA Strict Testing Steps

1. Upload every file in this ZIP.
2. Wait for Vercel deployment to finish.
3. In Chrome, clear site data for whattoeat-ten-hazel.vercel.app.
4. Close all Chrome tabs for the app.
5. Open Chrome directly and manually type the app URL.
6. Refresh twice.
7. Open Chrome menu. If Chrome recognizes it as installable, the menu should offer Install app.
8. If it still says Add to Home screen, Chrome has not granted native install eligibility yet; use Lighthouse/Application panel on desktop Chrome to see the exact failed criterion.

This build uses a valid manifest, required icons, standalone display, root scope, start_url, offline fallback, and a service worker fetch handler.
