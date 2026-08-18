(() => {
  const loadScript = src => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

  (async () => {
    try {
      await loadScript('/catalog-quality-core.js?v=2.0b-catalog-3');
      await loadScript('/meal-image-manifest.js?v=2.0b-images-1');
      await loadScript('/meal-images.js?v=2.0b-images-2');
      await loadScript('/meal-image-production.js?v=2.0b-images-1');
    } catch (error) {
      console.error('WhatToEat 2.0B enhancement loader failed.', error);
    }
  })();
})();
