(() => {
  const manifest = () => window.WTE_MEAL_IMAGES || {};
  const catalog = () => (typeof meals !== 'undefined' && Array.isArray(meals) ? meals : []);

  const validate = () => {
    const mealIds = new Set(catalog().map(meal => Number(meal.id)));
    const entries = Object.entries(manifest());
    const issues = [];
    const seenPaths = new Map();

    entries.forEach(([rawId, rawPath]) => {
      const id = Number(rawId);
      const path = String(rawPath || '');
      const expectedPath = `/meal-images/${id}.webp`;

      if (!Number.isInteger(id) || id <= 0) {
        issues.push({ type: 'invalid-id', id: rawId, path, message: `Manifest key ${rawId} is not a valid positive integer meal ID.` });
        return;
      }

      if (!mealIds.has(id)) {
        issues.push({ type: 'unknown-id', id, path, message: `Meal #${id} is not present in the active catalog.` });
      }

      if (path !== expectedPath) {
        issues.push({ type: 'noncanonical-path', id, path, expectedPath, message: `Meal #${id} should map to ${expectedPath}.` });
      }

      if (seenPaths.has(path)) {
        issues.push({ type: 'duplicate-path', id, path, otherId: seenPaths.get(path), message: `Meal #${id} and meal #${seenPaths.get(path)} point to the same asset path.` });
      } else if (path) {
        seenPaths.set(path, id);
      }
    });

    const report = {
      mapped: entries.length,
      valid: issues.length === 0,
      issueCount: issues.length,
      issues
    };

    window.WTE_MEAL_IMAGE_MANIFEST_REPORT = report;
    window.dispatchEvent(new CustomEvent('wte:meal-image-manifest-validated', { detail: report }));

    if (issues.length) {
      console.warn('WhatToEat meal-image manifest validation found issues.', report);
    }

    return report;
  };

  const renderAuditStatus = report => {
    const panel = document.querySelector('.wte-image-audit');
    if (!panel) return;
    let status = panel.querySelector('.wte-image-manifest-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'wte-image-manifest-status';
      status.style.margin = '0 0 12px';
      const toolbar = panel.querySelector('.wte-image-audit-toolbar');
      toolbar?.before(status);
    }
    if (!status) return;
    status.innerHTML = report.valid
      ? `<strong style="color:#8df0b7">Manifest integrity:</strong> PASS · ${report.mapped} mapped`
      : `<strong style="color:#ff8d8d">Manifest integrity:</strong> FAIL · ${report.issueCount} issue${report.issueCount === 1 ? '' : 's'}`;
  };

  const start = () => {
    window.WTE_MEAL_IMAGE_MANIFEST_VALIDATOR = Object.freeze({ validate });
    const report = validate();
    renderAuditStatus(report);

    const observer = new MutationObserver(() => renderAuditStatus(window.WTE_MEAL_IMAGE_MANIFEST_REPORT || report));
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
