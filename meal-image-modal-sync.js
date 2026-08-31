(() => {
  const exactImages = () => window.WTE_MEAL_IMAGES || {};
  const catalog = () => (typeof meals !== 'undefined' && Array.isArray(meals) ? meals : []);
  const visualClasses = ['pizza-wings','taco','nachos','pizza','ramen','pasta','burger','breakfast','wings','salad','meal-fallback','exact-meal-image','seafood','plate'];

  const mealByModalHeading = heading => {
    const text = String(heading?.textContent || '').trim();
    if (!text) return null;
    return catalog().find(meal => text === `${meal.emoji || ''} ${meal.name}`.trim() || text.endsWith(meal.name)) || null;
  };

  const fallbackClass = meal => {
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
    return 'meal-fallback';
  };

  const syncModal = () => {
    const root = document.querySelector('#modalContent');
    if (!root) return;
    const image = root.querySelector('.food-img');
    const heading = root.querySelector('h2');
    if (!image || !heading) return;

    const meal = mealByModalHeading(heading);
    if (!meal) return;

    image.dataset.mealId = String(meal.id);
    image.dataset.mealName = meal.name;
    image.dataset.mealEmoji = meal.emoji || '🍽️';
    image.classList.remove(...visualClasses);
    image.style.removeProperty('background-image');

    const exact = exactImages()[meal.id];
    if (exact) {
      image.classList.add('exact-meal-image');
      image.style.backgroundImage = `linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.38)),url("${exact}")`;
    } else {
      image.classList.add(fallbackClass(meal));
    }
  };

  const start = () => {
    syncModal();
    const root = document.querySelector('#modalContent');
    if (!root) return;
    const observer = new MutationObserver(syncModal);
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    window.WTE_SYNC_MEAL_MODAL_IMAGE = syncModal;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
