(() => {
  // 2.0B meal-image architecture.
  // Approved 1:1 production assets are declared in meal-image-manifest.js.
  const exactMealImages = window.WTE_MEAL_IMAGES || Object.freeze({});

  const style = document.createElement('style');
  style.textContent = `
    .food-img.meal-fallback{
      display:grid;
      place-items:center;
      align-content:center;
      gap:8px;
      padding:22px;
      text-align:center;
      background:
        radial-gradient(circle at 24% 18%,rgba(255,211,110,.22),transparent 32%),
        radial-gradient(circle at 78% 82%,rgba(255,77,77,.18),transparent 34%),
        linear-gradient(145deg,#352015,#171416 58%,#101012)!important;
    }
    .food-img.meal-fallback::before{
      content:attr(data-meal-emoji);
      position:relative;
      z-index:2;
      font-size:3.35rem;
      line-height:1;
      filter:drop-shadow(0 10px 18px rgba(0,0,0,.35));
    }
    .food-img.meal-fallback::after{
      content:attr(data-meal-name);
      position:relative;
      z-index:2;
      inset:auto;
      background:none;
      color:#fff8ed;
      font-size:.85rem;
      line-height:1.15;
      font-weight:950;
      max-width:22ch;
      text-shadow:0 2px 10px rgba(0,0,0,.55);
    }
    .food-img.exact-meal-image{
      background-size:cover!important;
      background-position:center!important;
      background-repeat:no-repeat!important;
    }
    .wte-image-audit{
      position:fixed;
      inset:12px;
      z-index:99999;
      overflow:auto;
      padding:18px;
      border:1px solid rgba(255,255,255,.14);
      border-radius:24px;
      background:rgba(11,10,12,.97);
      color:#fff8ed;
      box-shadow:0 28px 90px rgba(0,0,0,.68);
      font-family:inherit;
    }
    .wte-image-audit h1{margin:0 0 6px;font-size:1.65rem;line-height:1.05}
    .wte-image-audit p{color:#c9c2bc;line-height:1.4}
    .wte-image-audit-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:16px 0}
    .wte-image-audit-summary div{padding:12px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:rgba(255,255,255,.05)}
    .wte-image-audit-summary strong{display:block;font-size:1.35rem;color:#ffd36e}
    .wte-image-audit-toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
    .wte-image-audit button{padding:9px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:#252226;color:#fff;font-weight:800}
    .wte-image-audit button.active{background:linear-gradient(135deg,#ff8a1f,#ff4d4d);border-color:transparent}
    .wte-image-audit-list{display:grid;gap:7px}
    .wte-image-audit-row{display:grid;grid-template-columns:44px 1fr auto;gap:10px;align-items:center;padding:10px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035)}
    .wte-image-audit-row small{color:#9f9893}
    .wte-image-audit-status{font-size:.72rem;font-weight:900;padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.08)}
    .wte-image-audit-row.exact .wte-image-audit-status{background:rgba(57,214,134,.14);color:#8df0b7}
    .wte-image-audit-close{position:sticky;top:0;float:right;z-index:2}
    @media(max-width:520px){.wte-image-audit-summary{grid-template-columns:1fr 1fr}.wte-image-audit-row{grid-template-columns:38px 1fr}.wte-image-audit-status{grid-column:2;justify-self:start}}
  `;
  document.head.appendChild(style);

  const bucketForMeal = meal => {
    const name = String(meal?.name || '').toLowerCase();
    const category = String(meal?.category || '').toLowerCase();

    if (name.includes('pizza') && name.includes('wing')) return 'pizza-wings';
    if (/(taco|quesadilla|burrito|wrap|nacho)/.test(name)) return name.includes('nacho') ? 'nachos' : 'taco';
    if (/(pizza|flatbread)/.test(name)) return 'pizza';
    if (/(ramen|noodle|pho|udon|yakisoba)/.test(name)) return 'ramen';
    if (/(pasta|alfredo|spaghetti|mac|lasagna|ravioli|linguine)/.test(name)) return 'pasta';
    if (/(burger|sandwich|melt|slider|hot dog|cheesesteak|sub|panini)/.test(name)) return 'burger';
    if (/(breakfast|pancake|waffle|egg|omelet|biscuit|toast|cereal|hash|grits)/.test(name) || category.includes('breakfast')) return 'breakfast';
    if (/(wing|fried chicken|bbq chicken|jerk chicken|chicken plate|tender)/.test(name)) return 'wings';
    if (/(salad|veggie|vegetable|quinoa)/.test(name)) return 'salad';

    // Ambiguous plates are intentionally not represented by a misleading
    // category stock image while their exact asset is still pending.
    return 'meal-fallback';
  };

  const mealByName = name => {
    if (typeof meals === 'undefined' || !Array.isArray(meals)) return null;
    return meals.find(meal => meal.name === name) || null;
  };

  const visualClasses = ['pizza-wings','taco','nachos','pizza','ramen','pasta','burger','breakfast','wings','salad','meal-fallback'];

  const decorateCard = card => {
    if (!(card instanceof HTMLElement)) return;
    const title = card.querySelector('.food-body h3');
    const image = card.querySelector('.food-img');
    if (!title || !image) return;

    const meal = mealByName(title.textContent.trim());
    if (!meal) return;

    image.dataset.mealId = String(meal.id);
    image.dataset.mealName = meal.name;
    image.dataset.mealEmoji = meal.emoji || '🍽️';
    image.classList.remove(...visualClasses, 'exact-meal-image', 'seafood', 'plate');
    image.style.removeProperty('background-image');

    const exact = exactMealImages[meal.id];
    if (exact) {
      image.classList.add('exact-meal-image');
      image.style.backgroundImage = `linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.38)),url("${exact}")`;
      return;
    }

    image.classList.add(bucketForMeal(meal));
  };

  const decorateAll = root => {
    const scope = root instanceof Element || root instanceof Document ? root : document;
    if (scope.matches?.('.food-card')) decorateCard(scope);
    scope.querySelectorAll?.('.food-card').forEach(decorateCard);
  };

  const getCoverage = () => {
    const catalog = typeof meals !== 'undefined' && Array.isArray(meals) ? meals : [];
    const exactIds = new Set(Object.keys(exactMealImages).map(Number));
    const covered = catalog.filter(meal => exactIds.has(Number(meal.id)));
    const missing = catalog.filter(meal => !exactIds.has(Number(meal.id)));
    return {
      total: catalog.length,
      exact: covered.length,
      missing: missing.length,
      percent: catalog.length ? Math.round((covered.length / catalog.length) * 1000) / 10 : 0,
      covered: covered.map(meal => ({ id: meal.id, name: meal.name })),
      missingMeals: missing.map(meal => ({ id: meal.id, name: meal.name }))
    };
  };

  const renderAudit = () => {
    if (!new URLSearchParams(location.search).has('imageAudit')) return;
    if (document.querySelector('.wte-image-audit')) return;
    const coverage = getCoverage();
    const panel = document.createElement('section');
    panel.className = 'wte-image-audit';
    panel.innerHTML = `
      <button class="wte-image-audit-close" type="button">Close</button>
      <p style="margin:0 0 5px;color:#ffd36e;font-weight:900;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem">Developer tool</p>
      <h1>Meal Image Coverage</h1>
      <p>Every exact production image is tracked by meal ID. Fallbacks are allowed during rollout, but they do not count as complete.</p>
      <div class="wte-image-audit-summary">
        <div><strong>${coverage.total}</strong><span>Total meals</span></div>
        <div><strong>${coverage.exact}</strong><span>Exact images</span></div>
        <div><strong>${coverage.missing}</strong><span>Still missing</span></div>
        <div><strong>${coverage.percent}%</strong><span>Coverage</span></div>
      </div>
      <div class="wte-image-audit-toolbar">
        <button type="button" data-audit-filter="all" class="active">All</button>
        <button type="button" data-audit-filter="missing">Missing only</button>
        <button type="button" data-audit-filter="exact">Exact only</button>
      </div>
      <div class="wte-image-audit-list"></div>
    `;
    document.body.appendChild(panel);

    const list = panel.querySelector('.wte-image-audit-list');
    const renderRows = filter => {
      const catalog = typeof meals !== 'undefined' && Array.isArray(meals) ? meals : [];
      const rows = catalog.filter(meal => {
        const exact = Boolean(exactMealImages[meal.id]);
        return filter === 'all' || (filter === 'exact' && exact) || (filter === 'missing' && !exact);
      });
      list.innerHTML = rows.map(meal => {
        const exact = Boolean(exactMealImages[meal.id]);
        const fallback = exact ? 'exact asset' : bucketForMeal(meal);
        return `<div class="wte-image-audit-row ${exact ? 'exact' : ''}"><strong>#${meal.id}</strong><div><b>${meal.emoji || '🍽️'} ${meal.name}</b><br><small>${meal.category || ''} · ${fallback}</small></div><span class="wte-image-audit-status">${exact ? 'EXACT' : 'MISSING'}</span></div>`;
      }).join('');
    };

    renderRows('all');
    panel.querySelectorAll('[data-audit-filter]').forEach(button => {
      button.addEventListener('click', () => {
        panel.querySelectorAll('[data-audit-filter]').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        renderRows(button.dataset.auditFilter);
      });
    });
    panel.querySelector('.wte-image-audit-close').addEventListener('click', () => panel.remove());
  };

  const start = () => {
    decorateAll(document);
    window.getWhatToEatMealImageCoverage = getCoverage;
    window.WTE_MEAL_IMAGE_COVERAGE = getCoverage();
    renderAudit();

    const observer = new MutationObserver(records => {
      records.forEach(record => {
        record.addedNodes.forEach(node => {
          if (node instanceof Element) decorateAll(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
