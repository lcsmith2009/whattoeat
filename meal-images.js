(() => {
  // 2.0B meal-image architecture.
  // Exact production assets will live at /meal-images/<id>.webp and be added
  // to this manifest as they are approved. Until then, resolve every rendered
  // card from the actual meal identity rather than trusting stale legacy
  // meal.photo values.
  const exactMealImages = Object.freeze({
    // Example future entry: 1: '/meal-images/1.webp'
  });

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

    // Seafood plates and broad mixed plates are too easy to misrepresent with
    // one generic stock image. Until their exact assets exist, show an honest
    // branded meal identity card instead of the wrong food.
    if (/(salmon|fish|shrimp|seafood|tuna|catfish|tilapia|crab|lobster|mussel|calamari)/.test(name)) return 'meal-fallback';
    if (/(rice|bowl|curry|stew|chili|soup|pot roast|meatloaf|pork chop|steak|plate)/.test(name)) return 'meal-fallback';
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

  const start = () => {
    decorateAll(document);
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
