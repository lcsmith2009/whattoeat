(() => {
  if (typeof meals === 'undefined' || !Array.isArray(meals)) return;

  const genericDescriptions = new Set([
    'Warm, filling, and minding the business your stomach assigned it.',
    'Comfort food doing what a motivational quote could not.',
    'This plate is emotional support with seasoning.',
    'No plan, just vibes and a fork.',
    'Budget said no, seasoning said watch this.',
    'The economy may be loud, but this plate still found a way.',
    'This is financial creativity with a side of hunger.'
  ]);

  const placeholderStepSets = [
    ['Gather the main ingredient', 'Heat it up or cook it through', 'Add sauce or seasoning', 'Plate it like you meant it'],
    ['Use what you have', 'Warm it up', 'Add flavor aggressively', 'Eat before overthinking it'],
    ['Start with the base', 'Add protein or toppings', 'Make it saucy', 'Finish with crunch or heat']
  ];

  const hasPlaceholderSteps = meal => {
    if (!Array.isArray(meal.steps) || meal.steps.length !== 4) return false;
    return placeholderStepSets.some(set => set.every((step, index) => meal.steps[index] === step));
  };

  const photoForMeal = meal => {
    const name = String(meal.name || '').toLowerCase();
    const category = String(meal.category || '').toLowerCase();

    if (/(pizza|flatbread)/.test(name)) return 'pizza';
    if (/(ramen|noodle|pho)/.test(name)) return 'ramen';
    if (/(taco|quesadilla|burrito|wrap|nacho)/.test(name)) return name.includes('nacho') ? 'nachos' : 'taco';
    if (/(pasta|alfredo|spaghetti|mac|lasagna)/.test(name)) return 'pasta';
    if (/(burger|sandwich|melt|slider|hot dog)/.test(name)) return 'burger';
    if (/(breakfast|pancake|waffle|egg|omelet|biscuit|toast|cereal)/.test(name) || category.includes('breakfast')) return 'breakfast';
    if (/(salad|salmon|fish|shrimp|seafood|tuna|veggie|vegetable)/.test(name)) return 'salad';
    if (/(wing|fried chicken|bbq chicken|jerk chicken|chicken plate)/.test(name)) return 'wings';
    return null;
  };

  const descriptionForMeal = meal => {
    const name = String(meal.name || 'This pick');
    const lower = name.toLowerCase();

    if (/(pasta|alfredo|spaghetti|mac|lasagna)/.test(lower)) return `${name} brings saucy, filling pasta energy without pretending dinner needs a committee meeting.`;
    if (/(taco|quesadilla|burrito|wrap|nacho)/.test(lower)) return `${name} is built for big flavor, easy toppings, and eating before anybody can reopen the dinner debate.`;
    if (/(rice|bowl)/.test(lower)) return `${name} puts the good stuff over a dependable base so dinner feels complete without getting complicated.`;
    if (/(burger|sandwich|melt|slider|hot dog)/.test(lower)) return `${name} is handheld comfort with enough salty, crispy, or cheesy energy to settle the craving quickly.`;
    if (/(soup|stew|chili)/.test(lower)) return `${name} is warm, spoonable comfort for when your stomach wants dinner to handle the emotional labor.`;
    if (/(breakfast|pancake|waffle|egg|omelet|biscuit|toast|cereal)/.test(lower)) return `${name} proves breakfast energy is allowed whenever hunger decides to clock in.`;
    if (/(salmon|fish|shrimp|seafood|tuna)/.test(lower)) return `${name} gives you a flavorful seafood option that feels like an actual meal, not a punishment plate.`;
    if (/(chicken|steak|pork|meatloaf|turkey)/.test(lower)) return `${name} is a straight-to-the-point protein plate built to satisfy without making dinner a whole production.`;
    return `${name} gets food on the table with enough flavor and personality to make the decision feel worth it.`;
  };

  const universalSteps = meal => {
    const name = String(meal.name || 'this meal');
    const energy = meal.energy === 'low' ? 'Keep this as low-effort as possible and use ready-to-eat or pre-cooked ingredients where they make sense.' : 'Get the ingredients and any needed pan, bowl, or appliance ready before you start.';
    return [
      energy,
      `Prepare the main parts of ${name} in the simplest way that fits the ingredients—cook what needs cooking and leave ready-to-eat items cold.`,
      'Combine everything, then add seasoning, sauce, or toppings a little at a time so you can taste as you go.',
      'Serve once the cooked components are safely done and the texture tastes right; add something fresh, crunchy, or spicy if it needs a finish.'
    ];
  };

  meals.forEach(meal => {
    const betterPhoto = photoForMeal(meal);
    if (betterPhoto) meal.photo = betterPhoto;

    if (genericDescriptions.has(meal.desc)) {
      meal.desc = descriptionForMeal(meal);
    }

    // Final safety net: no meal should ever expose the legacy placeholder
    // recipe copy. Category-specific fixes may already have replaced it; if
    // one slipped through, use a universal flow that does not assume every
    // meal needs heating or cooking.
    if (hasPlaceholderSteps(meal)) {
      meal.steps = universalSteps(meal);
    }
  });

  // The legacy bundle renders Home/Feed before this overlay runs. Refresh the
  // rendered views once so the corrected descriptions/photos appear
  // immediately, while keeping recommendation logic and persisted state intact.
  if (typeof renderHome === 'function') renderHome();
  if (typeof renderFeed === 'function') renderFeed();
  if (typeof renderProfile === 'function') renderProfile();
})();
