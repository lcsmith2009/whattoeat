# WhatToEat PWA Cache Reset Testing

1. Upload every file in this ZIP.
2. Wait until Vercel finishes the newest deployment.
3. Open Chrome directly and type: https://whattoeat-ten-hazel.vercel.app/?pwaReset=20260518
4. Let the page auto-reset old service workers/caches once.
5. Reload the page one more time.
6. Open Chrome menu and check for **Install app**.
7. If it still says **Add to Home screen**, Chrome still does not consider the app installable; use Chrome DevTools/Lighthouse PWA audit on desktop to see the exact failing item.

This build visibly says **PWA Cache Reset Build** so you can confirm the correct files deployed.
