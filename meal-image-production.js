(() => {
  const catalog = () => (typeof meals !== 'undefined' && Array.isArray(meals) ? meals : []);
  const exactImages = () => window.WTE_MEAL_IMAGES || {};
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

  const getMissing = () => {
    const exact = exactImages();
    return catalog().filter(meal => !exact[meal.id]);
  };

  const getBatches = () => {
    const missing = getMissing();
    const batches = [];
    for (let i = 0; i < missing.length; i += BATCH_SIZE) {
      const items = missing.slice(i, i + BATCH_SIZE);
      batches.push({
        number: Math.floor(i / BATCH_SIZE) + 1,
        items: items.map(meal => ({
          id: meal.id,
          name: meal.name,
          target: `/meal-images/${meal.id}.webp`,
          prompt: productionPrompt(meal)
        }))
      });
    }
    return batches;
  };

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

  const batchAsText = batch => batch.items.map((item, index) =>
    `${index + 1}. MEAL #${item.id} — ${item.name}\nTARGET: ${item.target}\nPROMPT: ${item.prompt}`
  ).join('\n\n');

  const downloadManifest = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      batchSize: BATCH_SIZE,
      totalMeals: catalog().length,
      missingImages: getMissing().length,
      batches: getBatches()
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

  const enhanceAudit = panel => {
    if (!panel || panel.dataset.productionReady === 'true') return;
    panel.dataset.productionReady = 'true';
    const toolbar = panel.querySelector('.wte-image-audit-toolbar');
    if (!toolbar) return;

    const batches = getBatches();
    const status = document.createElement('p');
    status.style.margin = '0 0 12px';
    status.innerHTML = `<strong style="color:#ffd36e">Production queue:</strong> ${getMissing().length} images · ${batches.length} batch${batches.length === 1 ? '' : 'es'} of up to ${BATCH_SIZE}`;
    toolbar.before(status);

    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = batches.length ? `Copy Batch 1 (${batches[0].items.length})` : 'All images complete';
    next.disabled = !batches.length;
    next.addEventListener('click', () => batches.length && copyText(batchAsText(batches[0])));

    const all = document.createElement('button');
    all.type = 'button';
    all.textContent = 'Download Prompt Manifest';
    all.addEventListener('click', downloadManifest);

    toolbar.append(next, all);
  };

  const start = () => {
    window.WTE_IMAGE_PRODUCTION = Object.freeze({
      batchSize: BATCH_SIZE,
      promptForMeal: productionPrompt,
      getMissing,
      getBatches,
      batchAsText
    });

    const existing = document.querySelector('.wte-image-audit');
    if (existing) enhanceAudit(existing);

    const observer = new MutationObserver(() => {
      const panel = document.querySelector('.wte-image-audit');
      if (panel) enhanceAudit(panel);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
