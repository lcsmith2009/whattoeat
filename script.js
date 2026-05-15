const moods = [
  { id: 'lazy', emoji: '😴', title: 'Lazy', subtitle: 'Low effort only' },
  { id: 'broke', emoji: '💸', title: 'Broke', subtitle: 'Cheap but still good' },
  { id: 'comfort', emoji: '🛋️', title: 'Comfort', subtitle: 'Feed my feelings' },
  { id: 'protein', emoji: '💪', title: 'High Protein', subtitle: 'Trying to act right' },
  { id: 'quick', emoji: '⚡', title: 'Quick', subtitle: 'Under 15 minutes' },
  { id: 'craving', emoji: '🤤', title: 'Craving', subtitle: 'Something that hits' }
];

const meals = [
  {
    id: 'ramen-upgrade', mood: ['lazy', 'broke', 'quick', 'comfort'], emoji: '🍜',
    name: 'Upgraded Ramen Bowl',
    description: 'For when you need dinner fast and your standards are adjustable.',
    time: '10 min', budget: '$', energy: 'Low effort',
    ingredients: ['ramen', 'egg', 'cheese', 'hot sauce', 'seasoning'],
    steps: ['Boil ramen noodles.', 'Crack in an egg while it cooks.', 'Stir in cheese for creamy broth.', 'Add hot sauce or seasoning.', 'Eat it like you planned this all day.']
  },
  {
    id: 'tuna-melt', mood: ['broke', 'quick', 'protein'], emoji: '🥪',
    name: 'Tuna Melt Situation',
    description: 'Cheap, filling, and tastes like you put in more effort than you did.',
    time: '12 min', budget: '$', energy: 'Easy',
    ingredients: ['bread', 'tuna', 'mayo', 'cheese', 'pepper'],
    steps: ['Mix tuna with mayo and pepper.', 'Put it on bread with cheese.', 'Toast in a pan until crispy.', 'Cut it in half so it feels official.']
  },
  {
    id: 'rice-bowl', mood: ['lazy', 'broke', 'protein', 'comfort'], emoji: '🍚',
    name: 'Whatever Rice Bowl',
    description: 'Rice plus anything in the kitchen. That’s not chaos, that’s cuisine.',
    time: '15 min', budget: '$', energy: 'Medium-ish',
    ingredients: ['rice', 'protein', 'vegetables', 'sauce'],
    steps: ['Heat rice.', 'Add whatever protein you have.', 'Throw vegetables on top.', 'Add sauce.', 'Pretend it came from a food truck.']
  },
  {
    id: 'breakfast-dinner', mood: ['comfort', 'quick', 'lazy'], emoji: '🍳',
    name: 'Breakfast For Dinner',
    description: 'Because breakfast foods mind their business and never disappoint.',
    time: '15 min', budget: '$$', energy: 'Easy',
    ingredients: ['eggs', 'toast', 'cheese', 'bacon or sausage'],
    steps: ['Cook eggs however you like.', 'Toast bread.', 'Add cheese, bacon, or sausage.', 'Plate it up and call it brunch after dark.']
  },
  {
    id: 'air-fryer-chicken', mood: ['protein', 'quick', 'craving'], emoji: '🍗',
    name: 'Crispy Chicken Plate',
    description: 'For when you want takeout energy without takeout money.',
    time: '18 min', budget: '$$', energy: 'Medium',
    ingredients: ['chicken', 'seasoning', 'frozen fries or rice', 'sauce'],
    steps: ['Season chicken well.', 'Air fry or pan cook until crispy.', 'Heat fries, rice, or veggies.', 'Add sauce and act like this was the plan.']
  },
  {
    id: 'pasta-rescue', mood: ['comfort', 'broke', 'craving'], emoji: '🍝',
    name: 'Pasta Rescue Bowl',
    description: 'When life is doing too much, pasta minds its business.',
    time: '20 min', budget: '$', energy: 'Easy',
    ingredients: ['pasta', 'butter or sauce', 'cheese', 'seasoning'],
    steps: ['Boil pasta.', 'Drain and add butter or sauce.', 'Season it like you mean it.', 'Top with cheese.', 'Eat directly from the bowl if needed.']
  }
];

const moodGrid = document.getElementById('moodGrid');
const featuredMeal = document.getElementById('featuredMeal');
const mealResults = document.getElementById('mealResults');
const randomResult = document.getElementById('randomResult');
const favoritesList = document.getElementById('favoritesList');
const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');
const resultsTitle = document.getElementById('resultsTitle');
const resultsSubtitle = document.getElementById('resultsSubtitle');

let favorites = JSON.parse(localStorage.getItem('wteFavorites') || '[]');

function saveFavorites() {
  localStorage.setItem('wteFavorites', JSON.stringify(favorites));
}

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter(item => item !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  renderAll();
}

function mealCard(meal) {
  const faveLabel = isFavorite(meal.id) ? 'Saved ❤️' : 'Save 🤍';
  return `
    <article class="meal-card">
      <div class="meal-top">
        <div>
          <h3 class="meal-title">${meal.name}</h3>
          <p class="meal-desc">${meal.description}</p>
        </div>
        <div class="meal-emoji">${meal.emoji}</div>
      </div>
      <div class="meta-row">
        <span class="meta-chip">⏱️ ${meal.time}</span>
        <span class="meta-chip">💰 ${meal.budget}</span>
        <span class="meta-chip">🔥 ${meal.energy}</span>
      </div>
      <div class="action-row">
        <button class="secondary-btn" data-recipe="${meal.id}">Recipe</button>
        <button class="secondary-btn" data-favorite="${meal.id}">${faveLabel}</button>
      </div>
    </article>
  `;
}

function renderMoods() {
  moodGrid.innerHTML = moods.map(mood => `
    <button class="mood-btn" data-mood="${mood.id}">
      <strong>${mood.emoji} ${mood.title}</strong>
      <span>${mood.subtitle}</span>
    </button>
  `).join('');
}

function renderFeatured() {
  featuredMeal.outerHTML = mealCard(meals[0]).replace('meal-card', 'meal-card featured');
}

function showResultsForMood(moodId) {
  const mood = moods.find(item => item.id === moodId);
  const filtered = meals.filter(meal => meal.mood.includes(moodId));
  resultsTitle.textContent = `${mood.emoji} ${mood.title} Meals`;
  resultsSubtitle.textContent = filtered.length ? 'Here’s what makes sense right now.' : 'No meals found yet.';
  mealResults.innerHTML = filtered.map(mealCard).join('');
  switchScreen('resultsScreen');
}

function randomMeal() {
  const meal = meals[Math.floor(Math.random() * meals.length)];
  randomResult.innerHTML = mealCard(meal);
  switchScreen('generatorScreen');
}

function renderFavorites() {
  const savedMeals = meals.filter(meal => favorites.includes(meal.id));
  favoritesList.innerHTML = savedMeals.length
    ? savedMeals.map(mealCard).join('')
    : `<div class="empty-state"><h3>No favorites yet</h3><p>Save meals you actually want to remember.</p></div>`;
}

function openRecipe(id) {
  const meal = meals.find(item => item.id === id);
  if (!meal) return;
  modalContent.innerHTML = `
    <span class="pill">${meal.emoji} ${meal.time}</span>
    <h2 id="modalTitle">${meal.name}</h2>
    <p>${meal.description}</p>
    <h3>Ingredients</h3>
    <div class="tag-row">
      ${meal.ingredients.map(item => `<span class="tag">${item}</span>`).join('')}
    </div>
    <h3 style="margin-top:18px;">Quick Steps</h3>
    <ol class="recipe-list">
      ${meal.steps.map(step => `<li>${step}</li>`).join('')}
    </ol>
  `;
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAll() {
  renderMoods();
  const featuredNode = document.querySelector('.meal-card.featured');
  if (featuredNode) featuredNode.outerHTML = mealCard(meals[0]).replace('meal-card', 'meal-card featured');
  renderFavorites();
}

document.addEventListener('click', event => {
  const moodBtn = event.target.closest('[data-mood]');
  const navBtn = event.target.closest('[data-screen]');
  const randomBtn = event.target.closest('[data-action="random"]');
  const recipeBtn = event.target.closest('[data-recipe]');
  const favoriteBtn = event.target.closest('[data-favorite]');
  const closeBtn = event.target.closest('[data-close="modal"]');

  if (moodBtn) showResultsForMood(moodBtn.dataset.mood);
  if (navBtn) switchScreen(navBtn.dataset.screen);
  if (randomBtn) randomMeal();
  if (recipeBtn) openRecipe(recipeBtn.dataset.recipe);
  if (favoriteBtn) toggleFavorite(favoriteBtn.dataset.favorite);
  if (closeBtn) closeModal();
});

renderMoods();
renderFeatured();
renderFavorites();
randomResult.innerHTML = `<div class="empty-state"><h3>Ready when you are</h3><p>Tap the button and let fate pick dinner.</p></div>`;
mealResults.innerHTML = meals.map(mealCard).join('');
