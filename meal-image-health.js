(() => {
  const manifest = () => window.WTE_MEAL_IMAGES || {};
  const states = new Map();

  const fallbackCardImage = mealId => {
    document.querySelectorAll(`.food-img[data-meal-id="${mealId}"]`).forEach(image => {
      image.classList.remove('exact-meal-image');
      image.style.removeProperty('background-image');
      image.classList.add('meal-fallback');
    });
  };

  const refreshAuditRows = () => {
    const panel = document.querySelector('.wte-image-audit');
    if (!panel) return;

    let verified = 0;
    let broken = 0;
    let checking = 0;

    panel.querySelectorAll('.wte-image-audit-row').forEach(row => {
      const idText = row.querySelector('strong')?.textContent || '';
      const id = Number(idText.replace(/\D/g, ''));
      if (!id || !manifest()[id]) return;

      const status = states.get(id) || 'checking';
      const badge = row.querySelector('.wte-image-audit-status');
      if (!badge) return;

      row.classList.toggle('exact', status === 'verified');
      row.classList.toggle('broken', status === 'broken');

      if (status === 'verified') {
        verified += 1;
        badge.textContent = 'VERIFIED';
      } else if (status === 'broken') {
        broken += 1;
        badge.textContent = 'BROKEN';
      } else {
        checking += 1;
        badge.textContent = 'CHECKING';
      }
    });

    let health = panel.querySelector('.wte-image-health-summary');
    if (!health) {
      health = document.createElement('p');
      health.className = 'wte-image-health-summary';
      health.style.margin = '0 0 12px';
      const toolbar = panel.querySelector('.wte-image-audit-toolbar');
      toolbar?.before(health);
    }
    if (health) {
      health.innerHTML = `<strong style="color:#ffd36e">Asset health:</strong> ${verified} verified · ${checking} checking · ${broken} broken`;
    }
  };

  const verifyOne = (mealId, src) => new Promise(resolve => {
    states.set(Number(mealId), 'checking');
    const probe = new Image();
    probe.onload = () => {
      const valid = probe.naturalWidth > 0 && probe.naturalHeight > 0;
      states.set(Number(mealId), valid ? 'verified' : 'broken');
      if (!valid) fallbackCardImage(mealId);
      refreshAuditRows();
      resolve(valid);
    };
    probe.onerror = () => {
      states.set(Number(mealId), 'broken');
      fallbackCardImage(mealId);
      refreshAuditRows();
      resolve(false);
    };
    probe.src = src;
  });

  const verifyAll = async () => {
    const entries = Object.entries(manifest());
    await Promise.all(entries.map(([mealId, src]) => verifyOne(mealId, src)));
    return getReport();
  };

  const getReport = () => {
    const entries = Object.keys(manifest()).map(Number);
    const verified = entries.filter(id => states.get(id) === 'verified');
    const broken = entries.filter(id => states.get(id) === 'broken');
    const checking = entries.filter(id => !states.has(id) || states.get(id) === 'checking');
    return {
      mapped: entries.length,
      verified: verified.length,
      broken: broken.length,
      checking: checking.length,
      verifiedIds: verified,
      brokenIds: broken,
      checkingIds: checking
    };
  };

  const start = () => {
    window.WTE_MEAL_IMAGE_HEALTH = Object.freeze({ verifyAll, getReport });

    const observer = new MutationObserver(() => refreshAuditRows());
    observer.observe(document.body, { childList: true, subtree: true });

    verifyAll().then(report => {
      window.WTE_MEAL_IMAGE_HEALTH_REPORT = report;
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
