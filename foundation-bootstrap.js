(() => {
  const jsonDefaults = {
    wte_picks: {},
    wte_saved: [],
    wte_history: [],
    wte_moodCounts: {}
  };

  Object.entries(jsonDefaults).forEach(([key, fallback]) => {
    const raw = localStorage.getItem(key);
    if (raw === null) return;

    try {
      const parsed = JSON.parse(raw);
      const expectsArray = Array.isArray(fallback);
      const validShape = expectsArray
        ? Array.isArray(parsed)
        : parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);

      if (!validShape) {
        localStorage.setItem(key, JSON.stringify(fallback));
      }
    } catch (error) {
      console.warn(`WhatToEat repaired invalid local data for ${key}.`, error);
      localStorage.setItem(key, JSON.stringify(fallback));
    }
  });

  const streakRaw = localStorage.getItem('wte_streak');
  if (streakRaw !== null) {
    const streak = Number(streakRaw);
    if (!Number.isFinite(streak) || streak < 0) {
      localStorage.setItem('wte_streak', '1');
    }
  }

  // The May 2026 cache-reset migration is complete. Mark it done before the
  // legacy app bundle loads so normal visits no longer unregister workers,
  // delete caches, or redirect through the old pwaReset URL.
  localStorage.setItem('whattoeat_pwa_reset_20260518_done', 'yes');
  sessionStorage.removeItem('whattoeat_pwa_reset_reload');
})();
