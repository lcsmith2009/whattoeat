(() => {
  const catalog = () => (typeof meals !== 'undefined' && Array.isArray(meals) ? meals : []);
  const BATCH_SIZE = 20;

  const expectedAsset = meal => ({
    id: meal.id,
    name: meal.name,
    expectedPath: `/meal-images/${meal.id}.webp`,
    expectedFilename: `${meal.id}.webp`,
    batch: Math.floor((Number(meal.id) - 1) / BATCH_SIZE) + 1
  });

  const getExpectedAssets = () => catalog().map(expectedAsset);

  const getBatchChecklist = batchNumber => {
    const number = Number(batchNumber);
    if (!Number.isInteger(number) || number < 1) return null;
    const start = (number - 1) * BATCH_SIZE;
    const mealsInBatch = catalog().slice(start, start + BATCH_SIZE);
    if (!mealsInBatch.length) return null;
    return {
      batch: number,
      startIndex: start + 1,
      endIndex: start + mealsInBatch.length,
      count: mealsInBatch.length,
      assets: mealsInBatch.map(expectedAsset)
    };
  };

  const checklistAsText = batchNumber => {
    const batch = getBatchChecklist(batchNumber);
    if (!batch) return '';
    return [
      `WhatToEat Exact Meal Image Batch #${batch.batch}`,
      `Catalog positions ${batch.startIndex}-${batch.endIndex}`,
      '',
      ...batch.assets.map(asset => `[ ] #${asset.id} ${asset.name} -> ${asset.expectedPath}`)
    ].join('\n');
  };

  const downloadChecklist = batchNumber => {
    const batch = getBatchChecklist(batchNumber);
    if (!batch) return false;
    const payload = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      batch: batch.batch,
      startIndex: batch.startIndex,
      endIndex: batch.endIndex,
      count: batch.count,
      requiredDirectory: '/meal-images/',
      requiredFormat: 'webp',
      namingRule: '<meal-id>.webp',
      assets: batch.assets
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `whattoeat-image-batch-${batch.batch}-checklist.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return true;
  };

  const enhanceProductionAudit = () => {
    const panel = document.querySelector('.wte-image-audit');
    if (!panel || panel.dataset.readinessReady === 'true') return;
    const toolbar = panel.querySelector('.wte-image-audit-toolbar');
    if (!toolbar) return;

    panel.dataset.readinessReady = 'true';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'wte-image-readiness-next';
    button.textContent = 'Download Next Batch Checklist';
    button.addEventListener('click', () => {
      const next = window.WTE_IMAGE_PRODUCTION?.getNextBatch?.();
      if (next) downloadChecklist(next.number);
    });
    toolbar.appendChild(button);
  };

  const start = () => {
    window.WTE_IMAGE_READINESS = Object.freeze({
      batchSize: BATCH_SIZE,
      getExpectedAssets,
      getBatchChecklist,
      checklistAsText,
      downloadChecklist
    });

    enhanceProductionAudit();
    const observer = new MutationObserver(enhanceProductionAudit);
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
