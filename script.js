const moods = [
  { id: 'lazy', emoji: '😴', title: 'Lazy', subtitle: 'Low effort only' },
  { id: 'broke', emoji: '💸', title: 'Broke', subtitle: 'Cheap but good' },
  { id: 'comfort', emoji: '🛋️', title: 'Comfort', subtitle: 'Feed my feelings' },
  { id: 'protein', emoji: '💪', title: 'High Protein', subtitle: 'Trying to act right' },
  { id: 'quick', emoji: '⚡', title: 'Quick', subtitle: 'Under 15 minutes' },
  { id: 'craving', emoji: '🤤', title: 'Craving', subtitle: 'Something that hits' },
  { id: 'healthyish', emoji: '🥗', title: 'Healthy-ish', subtitle: 'Not sad food' },
  { id: 'couple', emoji: '👥', title: 'For Two', subtitle: 'Shareable meals' }
];

const filterState = { budget: 'any', time: 'any', energy: 'any' };
const filters = {
  budget: [
    { id: 'any', label: '💰 Any budget' },
    { id: '$', label: '$ Broke' },
    { id: '$$', label: '$$ Normal' },
    { id: '$$$', label: '$$$ Treat' }
  ],
  time: [
    { id: 'any', label: '⏱️ Any time' },
    { id: '10', label: '10 min' },
    { id: '15', label: '15 min' },
    { id: '30', label: '30 min' }
  ],
  energy: [
    { id: 'any', label: '🔥 Any energy' },
    { id: 'low', label: 'Low effort' },
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' }
  ]
};

const meals = [
  { id:'ramen-upgrade', mood:['lazy','broke','quick','comfort'], emoji:'🍜', name:'Upgraded Ramen Bowl', description:'For when dinner needs to happen before your patience expires.', time:'10 min', timeValue:10, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['ramen','egg','cheese','hot sauce','seasoning'], steps:['Boil the noodles.','Drop in an egg while it cooks.','Stir in cheese for creamy broth.','Add hot sauce or extra seasoning.','Eat like this was always the plan.'] },
  { id:'tuna-melt', mood:['broke','quick','protein'], emoji:'🥪', name:'Tuna Melt Situation', description:'Cheap, filling, and tastes like you did way more than open a can.', time:'12 min', timeValue:12, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['bread','tuna','mayo','cheese','pepper'], steps:['Mix tuna with mayo and pepper.','Add to bread with cheese.','Toast in a pan until crispy.','Cut it in half so it feels official.'] },
  { id:'rice-bowl', mood:['lazy','broke','protein','comfort','healthyish'], emoji:'🍚', name:'Whatever Rice Bowl', description:'Rice plus whatever is in the kitchen. That is not chaos, that is cuisine.', time:'15 min', timeValue:15, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['rice','protein','vegetables','sauce'], steps:['Heat rice.','Add any protein you have.','Add vegetables.','Sauce it up.','Pretend it came from a food truck.'] },
  { id:'breakfast-dinner', mood:['comfort','quick','lazy','couple'], emoji:'🍳', name:'Breakfast For Dinner', description:'Because breakfast foods mind their business and never disappoint.', time:'15 min', timeValue:15, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['eggs','toast','cheese','bacon or sausage'], steps:['Cook eggs however you like.','Toast bread.','Add cheese and bacon or sausage.','Plate it up and call it brunch after dark.'] },
  { id:'crispy-chicken', mood:['protein','quick','craving','couple'], emoji:'🍗', name:'Crispy Chicken Plate', description:'Takeout energy without the delivery fee disrespect.', time:'25 min', timeValue:25, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['chicken','seasoning','fries or rice','sauce'], steps:['Season chicken well.','Air fry or pan cook until crispy.','Heat fries, rice, or veggies.','Add sauce and get into it.'] },
  { id:'pasta-rescue', mood:['comfort','broke','craving','couple'], emoji:'🍝', name:'Pasta Rescue Bowl', description:'When life is doing too much, pasta shows up like family.', time:'20 min', timeValue:20, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['pasta','butter or sauce','cheese','seasoning'], steps:['Boil pasta.','Drain and add butter or sauce.','Season it properly.','Top with cheese.','Eat from the bowl if needed.'] },
  { id:'quesadilla', mood:['lazy','quick','broke','craving'], emoji:'🧀', name:'Lazy Quesadilla', description:'Cheese in a tortilla. Simple. Beautiful. Nobody needs a speech.', time:'8 min', timeValue:8, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['tortilla','cheese','leftover meat','salsa'], steps:['Put cheese on tortilla.','Add leftover meat if you have it.','Fold and toast both sides.','Dip in salsa or sour cream.'] },
  { id:'loaded-fries', mood:['craving','comfort','couple'], emoji:'🍟', name:'Loaded Fries Plate', description:'For when your stomach wants drama and cheese.', time:'20 min', timeValue:20, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['frozen fries','cheese','bacon or chicken','sauce'], steps:['Bake or air fry fries.','Add cheese while hot.','Top with bacon, chicken, or whatever protein.','Add sauce and mind your business.'] },
  { id:'chicken-wrap', mood:['quick','protein','healthyish'], emoji:'🌯', name:'Chicken Wrap', description:'Healthy-ish enough to feel responsible, tasty enough to not be punishment.', time:'12 min', timeValue:12, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['tortilla','chicken','lettuce','cheese','sauce'], steps:['Warm tortilla.','Add chicken and lettuce.','Add cheese and sauce.','Wrap it tight.','Cut it if you want to feel professional.'] },
  { id:'egg-fried-rice', mood:['broke','quick','comfort','protein'], emoji:'🍳', name:'Egg Fried Rice', description:'Leftover rice finally gets its redemption arc.', time:'15 min', timeValue:15, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['rice','eggs','soy sauce','vegetables','oil'], steps:['Scramble eggs in a pan.','Add rice and vegetables.','Splash in soy sauce.','Stir until hot and slightly crispy.'] },
  { id:'pb-banana-toast', mood:['lazy','broke','quick'], emoji:'🍌', name:'Peanut Butter Banana Toast', description:'Bare minimum effort, maximum “okay I ate something.”', time:'5 min', timeValue:5, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['bread','peanut butter','banana','honey or cinnamon'], steps:['Toast bread.','Spread peanut butter.','Add banana slices.','Finish with honey or cinnamon.'] },
  { id:'salmon-rice', mood:['protein','healthyish','comfort'], emoji:'🐟', name:'Salmon Rice Bowl', description:'Feels fancy, but still lets you eat in sweatpants.', time:'25 min', timeValue:25, budget:'$$$', energy:'Medium', energyKey:'medium', ingredients:['salmon','rice','vegetables','sauce'], steps:['Season salmon.','Cook salmon in pan or air fryer.','Heat rice and vegetables.','Add sauce and assemble the bowl.'] },
  { id:'grilled-cheese-soup', mood:['comfort','lazy','broke'], emoji:'🥫', name:'Grilled Cheese + Soup', description:'Childhood comfort with adult rent energy.', time:'15 min', timeValue:15, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['bread','cheese','butter','tomato soup'], steps:['Butter bread.','Add cheese and grill both sides.','Heat soup.','Dip sandwich like life is okay.'] },
  { id:'turkey-burger-bowl', mood:['protein','healthyish'], emoji:'🍔', name:'Burger Bowl', description:'Burger taste without pretending the bun was the important part.', time:'25 min', timeValue:25, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['ground turkey or beef','lettuce','pickles','cheese','sauce'], steps:['Cook and season ground meat.','Add lettuce to a bowl.','Top with meat, cheese, pickles, and sauce.','Mix and eat.'] },
  { id:'nachos', mood:['craving','lazy','couple'], emoji:'🧀', name:'Sheet Pan Nachos', description:'A snack that grew up and started paying bills.', time:'15 min', timeValue:15, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['chips','cheese','beans or meat','salsa','sour cream'], steps:['Spread chips on a pan.','Add cheese and beans or meat.','Bake until melted.','Top with salsa and sour cream.'] },
  { id:'hot-dog-plate', mood:['broke','lazy','quick'], emoji:'🌭', name:'Hot Dog Plate', description:'Not glamorous, but neither is being hungry.', time:'10 min', timeValue:10, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['hot dogs','buns','chips or fries','condiments'], steps:['Cook hot dogs.','Toast buns if you care today.','Add condiments.','Serve with chips or fries.'] },
  { id:'loaded-baked-potato', mood:['comfort','broke','lazy'], emoji:'🥔', name:'Loaded Baked Potato', description:'A potato carrying dinner like it pays rent.', time:'12 min', timeValue:12, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['potato','butter','cheese','bacon or broccoli','sour cream'], steps:['Microwave potato until soft.','Split it open.','Add butter, cheese, and toppings.','Microwave again until melted.'] },
  { id:'shrimp-tacos', mood:['quick','craving','protein','couple'], emoji:'🌮', name:'Shrimp Tacos', description:'Fast enough for a weeknight, good enough to brag a little.', time:'18 min', timeValue:18, budget:'$$$', energy:'Medium', energyKey:'medium', ingredients:['shrimp','tortillas','slaw or lettuce','seasoning','sauce'], steps:['Season shrimp.','Cook shrimp fast in a pan.','Warm tortillas.','Add lettuce or slaw and sauce.'] },
  { id:'chicken-caesar-wrap', mood:['protein','healthyish','quick'], emoji:'🥬', name:'Chicken Caesar Wrap', description:'Salad, but wrapped so it feels less like homework.', time:'10 min', timeValue:10, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['tortilla','chicken','romaine','caesar dressing','parmesan'], steps:['Warm tortilla.','Add chicken and romaine.','Add dressing and parmesan.','Wrap and eat.'] },
  { id:'spaghetti-meat-sauce', mood:['comfort','couple','craving'], emoji:'🍝', name:'Spaghetti With Meat Sauce', description:'Classic. Filling. Nobody at the table needs to complain.', time:'30 min', timeValue:30, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['spaghetti','ground meat','pasta sauce','seasoning','cheese'], steps:['Boil spaghetti.','Cook ground meat with seasoning.','Add sauce and simmer.','Mix with noodles and top with cheese.'] },
  { id:'chicken-alfredo', mood:['comfort','craving','couple'], emoji:'🍝', name:'Chicken Alfredo Shortcut', description:'Creamy pasta for when you deserve something that tastes like a nap.', time:'25 min', timeValue:25, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['pasta','chicken','alfredo sauce','cheese','pepper'], steps:['Boil pasta.','Cook or heat chicken.','Warm alfredo sauce.','Combine everything with cheese and pepper.'] },
  { id:'bean-cheese-burrito', mood:['broke','lazy','quick'], emoji:'🌯', name:'Bean & Cheese Burrito', description:'Cheap, fast, and way more loyal than most people.', time:'8 min', timeValue:8, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['tortilla','refried beans','cheese','hot sauce'], steps:['Spread beans on tortilla.','Add cheese.','Microwave or toast until warm.','Add hot sauce.'] },
  { id:'stir-fry', mood:['healthyish','protein','couple'], emoji:'🥦', name:'Chicken Stir Fry', description:'The “I’m getting my life together” meal that still tastes good.', time:'25 min', timeValue:25, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['chicken','frozen vegetables','rice','soy sauce','garlic'], steps:['Cook chicken pieces.','Add vegetables.','Season with garlic and soy sauce.','Serve over rice.'] },
  { id:'pizza-toast', mood:['lazy','quick','craving','broke'], emoji:'🍕', name:'Pizza Toast', description:'When you want pizza but the bank account said “be creative.”', time:'10 min', timeValue:10, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['bread','sauce','cheese','pepperoni or toppings'], steps:['Put sauce on bread.','Add cheese and toppings.','Toast or air fry until melted.','Pretend it’s artisanal.'] },
  { id:'chili-bowl', mood:['comfort','protein','couple'], emoji:'🌶️', name:'Quick Chili Bowl', description:'Warm, filling, and perfect for pretending you cooked all day.', time:'25 min', timeValue:25, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['ground meat','beans','tomato sauce','chili seasoning','cheese'], steps:['Cook ground meat.','Add beans, sauce, and seasoning.','Simmer until thick.','Top with cheese.'] },
  { id:'greek-yogurt-bowl', mood:['quick','healthyish','protein','lazy'], emoji:'🍓', name:'Greek Yogurt Bowl', description:'For when you need food, but cooking feels personal.', time:'5 min', timeValue:5, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['Greek yogurt','fruit','oats or granola','honey'], steps:['Add yogurt to a bowl.','Top with fruit.','Add oats or granola.','Drizzle honey.'] },
  { id:'fish-sandwich', mood:['protein','craving','quick'], emoji:'🐟', name:'Crispy Fish Sandwich', description:'A drive-thru vibe without leaving the house.', time:'20 min', timeValue:20, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['fish fillet','bun or bread','lettuce','sauce','fries'], steps:['Cook fish until crispy.','Toast bread or bun.','Add lettuce and sauce.','Serve with fries or chips.'] },
  { id:'chicken-salad', mood:['healthyish','protein','quick'], emoji:'🥗', name:'Big Chicken Salad', description:'A salad that understands people still like flavor.', time:'15 min', timeValue:15, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['lettuce','chicken','cheese','croutons','dressing'], steps:['Add lettuce to a bowl.','Top with chicken.','Add cheese, croutons, and dressing.','Toss and eat.'] },
  { id:'sausage-peppers', mood:['comfort','couple','protein'], emoji:'🌭', name:'Sausage & Peppers', description:'Smells like somebody knows what they are doing.', time:'25 min', timeValue:25, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['sausage','peppers','onions','rice or bread'], steps:['Slice sausage and vegetables.','Cook sausage until browned.','Add peppers and onions.','Serve over rice or in bread.'] },
  { id:'mac-tuna', mood:['broke','comfort','protein'], emoji:'🧀', name:'Tuna Mac Upgrade', description:'Box mac with a protein glow-up. Struggle meal with structure.', time:'15 min', timeValue:15, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['boxed mac','tuna','cheese','pepper','hot sauce'], steps:['Make boxed mac.','Stir in tuna.','Add extra cheese and pepper.','Finish with hot sauce if you like.'] },
  { id:'bbq-pulled-pork', mood:['comfort','craving','couple'], emoji:'🥪', name:'BBQ Pulled Pork Sandwich', description:'Messy in a good way. Nap recommended after.', time:'12 min', timeValue:12, budget:'$$', energy:'Low effort', energyKey:'low', ingredients:['pulled pork','bbq sauce','buns','slaw or pickles'], steps:['Heat pulled pork.','Mix with BBQ sauce.','Pile on buns.','Add slaw or pickles.'] },
  { id:'chicken-tenders-wrap', mood:['lazy','quick','craving'], emoji:'🌯', name:'Chicken Tender Wrap', description:'Frozen tenders becoming a meal like they got promoted.', time:'18 min', timeValue:18, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['chicken tenders','tortilla','lettuce','cheese','sauce'], steps:['Cook chicken tenders.','Warm tortilla.','Add lettuce, cheese, tenders, and sauce.','Wrap it up.'] },
  { id:'omelet', mood:['protein','quick','healthyish'], emoji:'🍳', name:'Whatever Omelet', description:'Eggs plus leftovers. Suddenly you are resourceful.', time:'12 min', timeValue:12, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['eggs','cheese','vegetables','meat if available'], steps:['Beat eggs.','Pour into pan.','Add cheese and fillings.','Fold and cook until set.'] },
  { id:'meatball-subs', mood:['comfort','craving','couple'], emoji:'🥖', name:'Meatball Subs', description:'Saucy, cheesy, and not here to be clean.', time:'20 min', timeValue:20, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['meatballs','marinara','sub rolls','cheese'], steps:['Heat meatballs in sauce.','Toast rolls.','Add meatballs and cheese.','Melt and serve.'] },
  { id:'fried-catfish', mood:['craving','comfort','protein'], emoji:'🐟', name:'Catfish Plate', description:'Crispy fish plate that tastes like somebody’s auntie approved it.', time:'25 min', timeValue:25, budget:'$$', energy:'Medium', energyKey:'medium', ingredients:['catfish','seasoning','cornmeal or coating','fries or rice'], steps:['Season fish.','Coat if needed.','Pan fry or air fry until crispy.','Serve with fries, rice, or veggies.'] },
  { id:'cereal-night', mood:['lazy','broke','quick'], emoji:'🥣', name:'Cereal Dinner', description:'Some nights the kitchen staff is unavailable. That staff is you.', time:'2 min', timeValue:2, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['cereal','milk','banana if available'], steps:['Pour cereal.','Add milk.','Add banana if you want bonus points.','Eat and move on.'] },
  { id:'rotisserie-style-bowl', mood:['protein','quick','healthyish'], emoji:'🍗', name:'Chicken Veggie Bowl', description:'Looks responsible, tastes like you didn’t give up.', time:'15 min', timeValue:15, budget:'$$', energy:'Easy', energyKey:'easy', ingredients:['chicken','rice','vegetables','sauce'], steps:['Heat chicken.','Heat rice and vegetables.','Add everything to a bowl.','Top with sauce.'] },
  { id:'sloppy-joe', mood:['comfort','broke','couple'], emoji:'🥪', name:'Sloppy Joe Night', description:'Messy, cheap, and doing exactly what it came to do.', time:'20 min', timeValue:20, budget:'$', energy:'Easy', energyKey:'easy', ingredients:['ground meat','sloppy joe sauce','buns','chips'], steps:['Brown ground meat.','Add sloppy joe sauce.','Simmer until thick.','Serve on buns with chips.'] },
  { id:'smoothie-meal', mood:['quick','healthyish','lazy'], emoji:'🥤', name:'Thick Smoothie Bowl', description:'For when chewing feels like a commitment.', time:'7 min', timeValue:7, budget:'$$', energy:'Low effort', energyKey:'low', ingredients:['banana','frozen fruit','yogurt or milk','peanut butter'], steps:['Blend banana, fruit, yogurt or milk.','Add peanut butter for fullness.','Pour into cup or bowl.','Sip like you are wellness-adjacent.'] },
  { id:'takeout-fakeout', mood:['craving','couple','comfort'], emoji:'🥡', name:'Takeout Fakeout Plate', description:'Frozen or leftover food plated like delivery. Sometimes presentation is the lie we need.', time:'15 min', timeValue:15, budget:'$', energy:'Low effort', energyKey:'low', ingredients:['leftovers','rice','sauce','green onion or seasoning'], steps:['Heat leftovers.','Heat rice.','Add sauce and seasoning.','Plate it like you paid $18.'] }
];

const moodGrid = document.getElementById('moodGrid');
const mealResults = document.getElementById('mealResults');
const randomResult = document.getElementById('randomResult');
const favoritesList = document.getElementById('favoritesList');
const modal = document.getElementById('recipeModal');
const modalContent = document.getElementById('modalContent');
const resultsTitle = document.getElementById('resultsTitle');
const resultsSubtitle = document.getElementById('resultsSubtitle');
const toast = document.getElementById('toast');

let favorites = JSON.parse(localStorage.getItem('wteFavorites') || '[]');
let toastTimer;

function saveFavorites() { localStorage.setItem('wteFavorites', JSON.stringify(favorites)); }
function isFavorite(id) { return favorites.includes(id); }

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 1100);
}

function toggleFavorite(id) {
  const meal = meals.find(item => item.id === id);
  if (isFavorite(id)) {
    favorites = favorites.filter(item => item !== id);
    showToast('Removed from Saved');
  } else {
    favorites.push(id);
    showToast(`${meal ? meal.name : 'Meal'} saved ❤️`);
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

function renderFilters() {
  Object.keys(filters).forEach(type => {
    const target = document.getElementById(`${type}Filters`);
    target.innerHTML = filters[type].map(filter => `
      <button class="filter-chip ${filterState[type] === filter.id ? 'active' : ''}" data-filter-type="${type}" data-filter-value="${filter.id}">${filter.label}</button>
    `).join('');
  });
}

function passesFilters(meal) {
  const budgetOk = filterState.budget === 'any' || meal.budget === filterState.budget;
  const timeOk = filterState.time === 'any' || meal.timeValue <= Number(filterState.time);
  const energyOk = filterState.energy === 'any' || meal.energyKey === filterState.energy;
  return budgetOk && timeOk && energyOk;
}

function filteredMeals() { return meals.filter(passesFilters); }

function showResultsForMood(moodId) {
  const mood = moods.find(item => item.id === moodId);
  const filtered = meals.filter(meal => meal.mood.includes(moodId));
  resultsTitle.textContent = `${mood.emoji} ${mood.title} Meals`;
  resultsSubtitle.textContent = `${filtered.length} realistic ideas for this mood.`;
  mealResults.innerHTML = filtered.length ? filtered.map(mealCard).join('') : emptyState('No meals found', 'We need to add more food to this mood.');
  switchScreen('resultsScreen');
}

function randomMeal() {
  const pool = filteredMeals();
  if (!pool.length) {
    randomResult.innerHTML = emptyState('No match with those filters', 'Loosen the filters. Your stomach is being too specific.');
    switchScreen('generatorScreen');
    return;
  }
  const meal = pool[Math.floor(Math.random() * pool.length)];
  randomResult.innerHTML = mealCard(meal);
  switchScreen('generatorScreen');
}

function renderFavorites() {
  const savedMeals = meals.filter(meal => favorites.includes(meal.id));
  favoritesList.innerHTML = savedMeals.length
    ? savedMeals.map(mealCard).join('')
    : emptyState('No favorites yet', 'Save meals you actually want to remember. Future you is hungry.');
}

function openRecipe(id) {
  const meal = meals.find(item => item.id === id);
  if (!meal) return;
  modalContent.innerHTML = `
    <span class="pill">${meal.emoji} ${meal.time} • ${meal.budget} • ${meal.energy}</span>
    <h2 id="modalTitle">${meal.name}</h2>
    <p>${meal.description}</p>
    <h3>Ingredients</h3>
    <div class="tag-row">${meal.ingredients.map(item => `<span class="tag">${item}</span>`).join('')}</div>
    <h3 style="margin-top:18px;">Quick Steps</h3>
    <ol class="recipe-list">${meal.steps.map(step => `<li>${step}</li>`).join('')}</ol>
  `;
  modal.classList.remove('hidden');
}

function closeModal() { modal.classList.add('hidden'); }

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.screen === screenId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function emptyState(title, message) {
  return `<div class="empty-state"><h3>${title}</h3><p>${message}</p></div>`;
}

function renderAll() {
  renderMoods();
  renderFilters();
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
  const filterBtn = event.target.closest('[data-filter-type]');

  if (moodBtn) showResultsForMood(moodBtn.dataset.mood);
  if (navBtn) switchScreen(navBtn.dataset.screen);
  if (randomBtn) randomMeal();
  if (recipeBtn) openRecipe(recipeBtn.dataset.recipe);
  if (favoriteBtn) toggleFavorite(favoriteBtn.dataset.favorite);
  if (closeBtn) closeModal();
  if (filterBtn) {
    filterState[filterBtn.dataset.filterType] = filterBtn.dataset.filterValue;
    renderFilters();
    randomMeal();
  }
});

renderAll();
randomResult.innerHTML = emptyState('Ready when you are', 'Pick filters or tap the button and let fate pick dinner.');
mealResults.innerHTML = meals.map(mealCard).join('');
