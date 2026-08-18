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

  document.addEventListener('DOMContentLoaded', () => {
    // Reconcile persisted meal references after the main bundle has loaded.
    if (typeof meals !== 'undefined' && typeof state !== 'undefined' && Array.isArray(meals)) {
      const validMealIds = new Set(meals.map(meal => meal.id));
      const cleanedSaved = [...new Set(state.saved.filter(id => validMealIds.has(id)))];
      const cleanedHistory = state.history
        .filter(item => item && typeof item === 'object' && validMealIds.has(item.id))
        .slice(0, 20);

      if (cleanedSaved.length !== state.saved.length) {
        state.saved = cleanedSaved;
        localStorage.setItem('wte_saved', JSON.stringify(cleanedSaved));
      }

      if (cleanedHistory.length !== state.history.length) {
        state.history = cleanedHistory;
        localStorage.setItem('wte_history', JSON.stringify(cleanedHistory));
      }
    }

    // Follow Smart Pick, Smart Reroll, and Chaos result mutations so the
    // generated meal becomes the immediate focus on mobile.
    const smartResult = document.getElementById('smartResult');
    if (smartResult) {
      let resultScrollFrame = 0;
      const scrollToRenderedResult = () => {
        if (smartResult.hidden || !smartResult.textContent?.trim()) return;
        window.cancelAnimationFrame(resultScrollFrame);
        resultScrollFrame = window.requestAnimationFrame(() => {
          smartResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      };

      const resultObserver = new MutationObserver(scrollToRenderedResult);
      resultObserver.observe(smartResult, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['hidden', 'class']
      });
    }

    const backdrop = document.getElementById('modalBackdrop');
    const modal = backdrop?.querySelector('.modal-card');
    const closeButton = document.getElementById('closeModal');
    if (!backdrop || !modal || !closeButton) return;

    let previouslyFocused = null;
    const focusableSelector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const isOpen = () => !backdrop.hidden && !backdrop.hasAttribute('hidden');

    const closeModalAccessibly = () => {
      closeButton.click();
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };

    const observer = new MutationObserver(() => {
      if (isOpen()) {
        if (document.activeElement && !modal.contains(document.activeElement)) {
          previouslyFocused = document.activeElement;
        }
        window.requestAnimationFrame(() => closeButton.focus());
      }
    });

    observer.observe(backdrop, { attributes: true, attributeFilter: ['hidden'] });

    document.addEventListener('keydown', event => {
      if (!isOpen()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeModalAccessibly();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [...modal.querySelectorAll(focusableSelector)]
        .filter(element => element instanceof HTMLElement && !element.hidden);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });
})();
