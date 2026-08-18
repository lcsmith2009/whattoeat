(() => {
  const catalog = () => (typeof meals !== 'undefined' && Array.isArray(meals) ? meals : []);
  const exactImages = () => window.WTE_MEAL_IMAGES || {};
  const healthReport = () => window.WTE_MEAL_IMAGE_HEALTH_REPORT || { brokenIds: [] };
  const BATCH_SIZE = 20;

  const productionPrompt = meal => {
    const mood = Array.isArray(meal.mood) ? meal.mood.join(', ') : (meal.mood || 'general');
    return [
      `Create one appetizing, photorealistic food photograph of ${meal.name}.`,
      `The image must clearly and literally depict ${meal.name}; do not substitute a different dish or generic category meal.`,
      `Category: ${meal.category || 'meal'}. Mood context: ${mood}.`,
      'Commercial mobile-app food photography, restaurant-quality plating, realistic ingredients and textures, warm natural lighting, slight overhead 3/4 camera angle, dark neutral tabletop, shallow depth of field.',
      'No people, hands, utensils blocking the food, logos, packaging, watermarks, labels, captions, typography, borders, collages, split screens, or extra dishes.',
      'Center the complete meal with comfortable crop-safe space around it so it works in both portrait and landscape cards.',
      'Output should look like a believable finished meal someone would actually want to eat, not an illustration or plastic-looking render.',
      `Production asset ID: ${meal.id}. Target filename: /meal-images/${meal.id}.webp.`
    ].join(' ');
  };

  const pendingReason = meal => {
    const exact = exactImages();
    const broken = new Set((healthReport().brokenIds || []).map(Number));
    if (!exact[meal.id]) return 'missing';
    if (broken.has(Number(meal.id))) return 'broken';
    return null;
  };

  const getPending = () => catalog().filter(meal => pendingReason(meal));
  const getMissing = getPending;

  // Batch identity is permanently tied to catalog order. Completing Batch 1
  // must never cause the original Batch 2 meals to be relabeled as Batch 1.
  const getBatches = () => {
    const allMeals = catalog();
    const batches = [];
    for (let i = 0; i < allMeals.length; i += BATCH_SIZE) {
      const mealsInBatch = allMeals.slice(i, i + BATCH_SIZE);
      const items = mealsInBatch.map(meal => ({
        id: meal.id,
        name: meal.name,
        reason: pendingReason(meal),
        target: `/meal-images/${meal.id}.webp`,
        prompt: productionPrompt(meal)
      }));
      const pendingItems = items.filter(item => item.reason);
      batches.push({
        number: Math.floor(i / BATCH_SIZE) + 1,
        startIndex: i + 1,
        endIndex: i + mealsInBatch.length,
        total: items.length,
        complete: items.length - pendingItems.length,
        pending: pendingItems.length,
        items,
        pendingItems
      });
    }
    return batches;
  };

  const getPendingBatches = () => getBatches().filter(batch => batch.pending > 0);
  const getNextBatch = () => getPendingBatches()[0] || null;

  const copyText = async text => {
    try {
      await navigator.clipboard.writeText(text);
      if (typeof toast === 'function') toast('Image production batch copied');
      return true;
    } catch (error) {
      console.warn('Could not copy image production batch.', error);
      return false;
    }
  };

  const batchAsText = (batch, pendingOnly = true) => {
    const source = pendingOnly ? batch.pendingItems : batch.items;
    return source.map((item, index) => {
      const status = item.reason ? item.reason.toUpperCase() : 'VERIFIED/MAPPED';
      return `${index + 1}. MEAL #${item.id} — ${item.name}\nBATCH: ${batch.number}\nSTATUS: ${status}\nTARGET: ${item.target}\nPROMPT: ${item.prompt}`;
    }).join('\n\n');
  };

  const downloadManifest = () => {
    const batches = getBatches();
    const pendingBatches = batches.filter(batch => batch.pending > 0);
    const payload = {
      generatedAt: new Date().toISOString(),
      batchIdentity: 'stable-catalog-order',
      batchSize: BATCH_SIZE,
      totalMeals: catalog().length,
      totalBatches: batches.length,
      pendingImages: getPending().length,
      pendingBatches: pendingBatches.length,
      brokenImages: (healthReport().brokenIds || []).length,
      batches
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'whattoeat-meal-image-production.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const refreshProductionUI = panel => {
    if (!panel) return;
    const status = panel.querySelector('.wte-image-production-status');
    const next = panel.querySelector('.wte-image-production-next');
    const batches = getBatches();
    const pendingBatches = batches.filter(batch => batch.pending > 0);
    const pending = getPending();
    const brokenCount = (healthReport().brokenIds || []).length;
    const nextBatch = getNextBatch();

    if (status) {
      status.innerHTML = `<strong style="color:#ffd36e">Production queue:</strong> ${pending.length} image${pending.length === 1 ? '' : 's'} · ${pendingBatches.length}/${batches.length} batch${batches.length === 1 ? '' : 'es'} still active${brokenCount ? ` · ${brokenCount} broken requeued` : ''}`;
    }

    if (next) {
      next.textContent = nextBatch ? `Copy Batch ${nextBatch.number} (${nextBatch.pending} pending)` : 'All images complete';
      next.disabled = !nextBatch;
    }
  };

  const enhanceAudit = panel => {
    if (!panel) return;
    const toolbar = panel.querySelector('.wte-image-audit-toolbar');
    if (!toolbar) return;

    if (panel.dataset.productionReady !== 'true') {
      panel.dataset.productionReady = 'true';

      const status = document.createElement('p');
      status.className = 'wte-image-production-status';
      status.style.margin = '0 0 12px';
      toolbar.before(status);

      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'wte-image-production-next';
      next.addEventListener('click', () => {
        const batch = getNextBatch();
        if (batch) copyText(batchAsText(batch, true));
      });

      const all = document.createElement('button');
      all.type = 'button';
      all.textContent = 'Download Prompt Manifest';
      all.addEventListener('click', downloadManifest);

      toolbar.append(next, all);
    }

    refreshProductionUI(panel);
  };

  const start = () => {
    window.WTE_IMAGE_PRODUCTION = Object.freeze({
      batchSize: BATCH_SIZE,
      promptForMeal: productionPrompt,
      pendingReason,
      getPending,
      getMissing,
      getBatches,
      getPendingBatches,
      getNextBatch,
      batchAsText
    });

    const refresh = () => {
      const panel = document.querySelector('.wte-image-audit');
      if (panel) enhanceAudit(panel);
    };

    refresh();
    window.addEventListener('wte:meal-image-health-updated', refresh);

    const observer = new MutationObserver(refresh);
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
