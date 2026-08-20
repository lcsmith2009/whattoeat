(() => {
  const EXPECTED_MIN_ID = 1;
  const EXPECTED_MAX_ID = 320;
  const expectedIds = Array.from({ length: EXPECTED_MAX_ID }, (_, index) => index + 1);

  const forbiddenDescriptions = new Set([
    'Warm, filling, and minding the business your stomach assigned it.',
    'Comfort food doing what a motivational quote could not.',
    'This plate is emotional support with seasoning.',
    'No plan, just vibes and a fork.',
    'Budget said no, seasoning said watch this.',
    'The economy may be loud, but this plate still found a way.',
    'This is financial creativity with a side of hunger.'
  ]);

  const forbiddenWhyFragments = [
    'This variation keeps the comfort classics vibe but gives you a fresh reroll so the app does not feel repetitive.',
    'matches the assignment without making dinner a whole personality crisis.'
  ];

  const forbiddenStepSets = [
    ['Gather the main ingredient', 'Heat it up or cook it through', 'Add sauce or seasoning', 'Plate it like you meant it'],
    ['Use what you have', 'Warm it up', 'Add flavor aggressively', 'Eat before overthinking it'],
    ['Start with the base', 'Add protein or toppings', 'Make it saucy', 'Finish with crunch or heat']
  ];

  const sameSteps = (steps, set) => Array.isArray(steps) &&
    steps.length === set.length &&
    set.every((step, index) => steps[index] === step);

  const validate = () => {
    const catalog = Array.isArray(window.meals) ? window.meals : [];
    const ids = catalog.map(meal => Number(meal.id)).filter(Number.isFinite);
    const idCounts = new Map();
    ids.forEach(id => idCounts.set(id, (idCounts.get(id) || 0) + 1));

    const missingIds = expectedIds.filter(id => !idCounts.has(id));
    const duplicateIds = [...idCounts.entries()].filter(([, count]) => count > 1).map(([id]) => id);
    const unexpectedIds = ids.filter(id => id < EXPECTED_MIN_ID || id > EXPECTED_MAX_ID);

    const issues = [];
    const checkedMeals = catalog.filter(meal => Number(meal.id) >= EXPECTED_MIN_ID && Number(meal.id) <= EXPECTED_MAX_ID);

    checkedMeals.forEach(meal => {
      const id = Number(meal.id);
      const name = String(meal.name || `Meal ${id}`);
      const desc = String(meal.desc || '').trim();
      const why = String(meal.why || '').trim();
      const steps = meal.steps;

      if (!desc) issues.push({ id, name, field: 'desc', reason: 'missing description' });
      else if (forbiddenDescriptions.has(desc)) issues.push({ id, name, field: 'desc', reason: 'legacy generic description remains' });

      if (!why) issues.push({ id, name, field: 'why', reason: 'missing Why copy' });
      else if (forbiddenWhyFragments.some(fragment => why.includes(fragment))) {
        issues.push({ id, name, field: 'why', reason: 'legacy generated Why copy remains' });
      }

      if (!Array.isArray(steps) || steps.length < 3) {
        issues.push({ id, name, field: 'steps', reason: 'missing or incomplete Make It steps' });
      } else if (forbiddenStepSets.some(set => sameSteps(steps, set))) {
        issues.push({ id, name, field: 'steps', reason: 'legacy placeholder Make It steps remain' });
      }
    });

    const result = {
      pass: catalog.length >= EXPECTED_MAX_ID && missingIds.length === 0 && duplicateIds.length === 0 && unexpectedIds.length === 0 && issues.length === 0,
      expectedMeals: EXPECTED_MAX_ID,
      catalogMeals: catalog.length,
      checkedMeals: checkedMeals.length,
      missingIds,
      duplicateIds,
      unexpectedIds: [...new Set(unexpectedIds)],
      issues,
      checkedAt: new Date().toISOString()
    };

    window.WhatToEatCatalogQuality = result;
    window.dispatchEvent(new CustomEvent('whattoeat:catalog-quality-validated', { detail: result }));

    if (result.pass) {
      console.info(`WhatToEat catalog quality PASS: ${result.checkedMeals}/${result.expectedMeals} meals validated.`);
    } else {
      console.warn('WhatToEat catalog quality FAIL:', result);
    }

    return result;
  };

  const runWhenReady = () => {
    if (Array.isArray(window.meals) && window.meals.length) {
      requestAnimationFrame(() => requestAnimationFrame(validate));
      return;
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (Array.isArray(window.meals) && window.meals.length) {
        clearInterval(timer);
        requestAnimationFrame(() => requestAnimationFrame(validate));
      } else if (attempts >= 100) {
        clearInterval(timer);
        validate();
      }
    }, 50);
  };

  window.validateWhatToEatCatalogQuality = validate;
  runWhenReady();
})();