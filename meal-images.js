(() => {
  // 2.0B meal-image architecture.
  // Exact production assets will live at /meal-images/<id>.webp and be added
  // to this manifest as they are approved. Until then, use the most honest
  // existing visual bucket for the actual rendered meal name instead of
  // trusting stale legacy meal.photo values.
  const exactMealImages = Object.freeze({
    // Example future entry: 1: '/meal-images/1.webp'
  });

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
    if (/(salmon|fish|shrimp|seafood|tuna|catfish|tilapia|crab|lobster|mussel|calamari)/.test(name)) return 'seafood';
    if (/(rice|bowl|curry|stew|chili|soup|pot roast|meatloaf|pork chop|steak)/.test(name)) return 'plate';
    return 'plate';
  };

  const mealByName = name => {
    if (typeof meals === 'undefined' || !Array.isArray(meals)) return null;
    return meals.find(meal => meal.name === name) || null;
  };

  const visualClasses = ['pizza-wings','taco','nachos','pizza','ramen','pasta','burger','breakfast','wings','salad','seafood','plate'];

  const decorateCard = card => {
    if (!(card instanceof HTMLElement)) return;
    const title = card.querySelector('.food-body h3');
    const image = card.querySelector('.food-img');
    if (!title || !image) return;

    const meal = mealByName(title.textContent.trim());
    if (!meal) return;

    image.dataset.mealId = String(meal.id);
    image.dataset.mealName = meal.name;
    image.classList.remove(...visualClasses);
    image.style.removeProperty('background-image');

    const exact = exactMealImages[meal.id];
    if (exact) {
      image.classList.add('exact-meal-image');
      image.style.backgroundImage = `linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.38)),url("${exact}")`;
      return;
    }

    image.classList.remove('exact-meal-image');
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
