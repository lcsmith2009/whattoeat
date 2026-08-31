(() => {
  // Some result/feed/saved surfaces reuse an existing .food-card and replace
  // its text/content instead of inserting a brand-new card. meal-images.js
  // handles newly inserted cards; this layer makes reused cards re-run through
  // the resolver whenever their contents change so an old meal image cannot
  // remain attached after a reroll or in-place render update.

  const syncCard = card => {
    if (!(card instanceof HTMLElement) || !card.matches('.food-card')) return;

    const title = card.querySelector('.food-body h3')?.textContent?.trim();
    const image = card.querySelector('.food-img');
    if (!title || !image || typeof meals === 'undefined' || !Array.isArray(meals)) return;

    const meal = meals.find(item => item.name === title);
    if (!meal) return;

    // If the resolver has already synchronized this card to the current meal,
    // there is nothing to do. Otherwise, trigger the smallest possible DOM
    // insertion that meal-images.js observes, then remove it immediately.
    if (image.dataset.mealId === String(meal.id) && image.dataset.mealName === meal.name) return;

    const marker = document.createElement('span');
    marker.hidden = true;
    marker.dataset.wteImageSync = String(meal.id);
    card.appendChild(marker);
    marker.remove();
  };

  const cardsForRecord = record => {
    const cards = new Set();
    const target = record.target instanceof Element ? record.target : record.target?.parentElement;
    const targetCard = target?.closest?.('.food-card');
    if (targetCard) cards.add(targetCard);

    record.addedNodes?.forEach(node => {
      const element = node instanceof Element ? node : node.parentElement;
      const card = element?.closest?.('.food-card');
      if (card) cards.add(card);
      element?.querySelectorAll?.('.food-card').forEach(item => cards.add(item));
    });

    return cards;
  };

  const start = () => {
    document.querySelectorAll('.food-card').forEach(syncCard);

    const observer = new MutationObserver(records => {
      const cards = new Set();
      records.forEach(record => cardsForRecord(record).forEach(card => cards.add(card)));
      cards.forEach(syncCard);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    window.WTE_MEAL_IMAGE_CARD_SYNC = Object.freeze({ syncCard });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
