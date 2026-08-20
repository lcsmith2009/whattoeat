(() => {
  if (typeof meals === 'undefined' || !Array.isArray(meals)) return;

  const curated = {
    'Baked Mac & Cheese': {
      desc: 'Creamy, cheesy, baked until the top has those browned little edges worth fighting over.',
      why: 'You wanted comfort, and baked mac is basically a weighted blanket with a crispy cheese top.',
      steps: ['Boil macaroni until just tender, then drain.', 'Stir the pasta with a creamy cheese sauce and season to taste.', 'Spread into a baking dish and add extra cheese on top.', 'Bake until bubbling and browned around the edges.']
    },
    'Chicken Alfredo': {
      desc: 'Creamy pasta, tender chicken, and enough Parmesan to make a rough day mind its business.',
      why: 'Chicken Alfredo hits the comfort craving without asking you to invent dinner from scratch.',
      steps: ['Cook the pasta and reserve a splash of pasta water.', 'Season and cook the chicken, then slice it.', 'Warm butter and cream, stir in Parmesan, and loosen with pasta water as needed.', 'Toss with pasta, top with chicken, and finish with black pepper.']
    },
    'Smothered Pork Chops': {
      desc: 'Seared pork chops tucked under savory onion gravy. This is sit-down-and-respect-the-plate food.',
      why: 'You picked comfort and chef energy, so a proper smothered plate earns the extra effort.',
      steps: ['Season and sear the pork chops until browned, then set aside.', 'Cook sliced onions in the same pan until soft.', 'Stir in a little flour, then slowly add broth to make gravy.', 'Return the chops to the pan and simmer gently until cooked through and tender.']
    },
    'Meatloaf Plate': {
      desc: 'Savory glazed meatloaf with the kind of sides that make a weeknight plate feel like somebody actually cared.',
      why: 'You wanted classic comfort and have enough energy for a proper sit-down meal, so meatloaf earns the assignment.',
      steps: ['Mix ground meat with egg, breadcrumbs, seasoning, and a little onion without overworking it.', 'Shape into a loaf and brush the top with ketchup or your preferred glaze.', 'Bake until browned and safely cooked through in the center.', 'Rest briefly, slice, and serve with mashed potatoes, vegetables, or another comfort-food side.']
    },
    'Pot Roast Bowl': {
      desc: 'Fork-tender beef, soft vegetables, and gravy over something starchy enough to catch every drop.',
      why: 'This is full-volume comfort food for a day when a little patience can turn into a serious plate.',
      steps: ['Season and brown the beef on all sides.', 'Add onions, carrots, potatoes, broth, and your preferred herbs.', 'Cover and cook low and slow until the beef pulls apart easily.', 'Shred or slice the beef and serve with vegetables and pan juices.']
    },
    'Chicken & Dumplings': {
      desc: 'Savory chicken stew with soft dumplings floating on top like they know exactly why you came.',
      why: 'You asked for comfort, and chicken and dumplings delivers warm, filling, no-nonsense energy.',
      steps: ['Simmer cooked chicken with broth, onion, and vegetables until flavorful.', 'Season the broth and bring it to a gentle simmer.', 'Drop spoonfuls of biscuit or dumpling dough over the top.', 'Cover and cook until the dumplings are puffed and cooked through.']
    },
    'Loaded Baked Potato': {
      desc: 'A fluffy potato turned into a whole meal with cheese, sour cream, scallions, and whatever else is behaving in the fridge.',
      why: 'Cheap ingredients, low drama, and enough toppings to make a potato feel like a plan.',
      steps: ['Pierce the potato and bake or microwave until completely tender.', 'Split it open and fluff the inside with a fork.', 'Add butter, cheese, sour cream, and your favorite protein or vegetables.', 'Finish with scallions, pepper, hot sauce, or anything crunchy.']
    },
    'Grilled Cheese & Tomato Soup': {
      desc: 'Crispy buttery bread, melted cheese, and tomato soup made specifically for dipping.',
      why: 'Low energy plus comfort mood is exactly when grilled cheese and soup starts making excellent decisions for you.',
      steps: ['Butter the outside of two bread slices and add cheese between them.', 'Cook in a skillet over medium-low heat until both sides are golden and the cheese melts.', 'Warm tomato soup on the stove or in the microwave.', 'Cut the sandwich and serve immediately for maximum dipping efficiency.']
    },
    'Shepherd’s Pie Bowl': {
      desc: 'Savory beef and vegetables under creamy mashed potatoes, scooped into a bowl where every bite gets a little of everything.',
      why: 'This gives you full shepherd’s-pie comfort without needing the presentation to behave perfectly.',
      steps: ['Brown the ground meat with onion and season it well.', 'Stir in vegetables, a little broth or gravy, and simmer until thickened.', 'Prepare or reheat mashed potatoes until hot and creamy.', 'Spoon the meat mixture into bowls and pile the mashed potatoes over the top.']
    },
    'Chicken Pot Pie Skillet': {
      desc: 'Creamy chicken and vegetables under a golden biscuit or pastry top, minus the ceremony of building a perfect pie.',
      why: 'You want cozy pot-pie energy, and the skillet route gets there with less fuss and more crispy topping per decision.',
      steps: ['Cook onion and vegetables until they begin to soften.', 'Stir in cooked chicken, seasoning, and a creamy broth-based sauce.', 'Top the skillet with biscuit dough, puff pastry, or another easy crust option.', 'Bake until the filling bubbles and the topping is deeply golden.']
    },
    'Turkey Meatball Pasta': {
      desc: 'Saucy pasta with tender turkey meatballs when you want comfort without going completely off the rails.',
      why: 'This keeps the cozy pasta energy while giving you a straightforward protein-forward dinner.',
      steps: ['Mix ground turkey with seasoning and a binder, then roll into meatballs.', 'Brown the meatballs in a skillet and finish cooking them in marinara.', 'Boil pasta until tender and drain.', 'Toss pasta with sauce and meatballs, then finish with Parmesan if you have it.']
    },
    'BBQ Chicken Plate': {
      desc: 'Saucy chicken with smoky-sweet barbecue flavor and sides that know they belong next to it.',
      why: 'You wanted something familiar and satisfying without turning dinner into a culinary group project.',
      steps: ['Season the chicken and cook it until nearly done by grill, skillet, oven, or air fryer.', 'Brush generously with barbecue sauce during the final few minutes.', 'Let the chicken rest briefly so the juices stay put.', 'Serve with an easy side like rice, corn, slaw, or vegetables.']
    },
    'Creamy Tuscan Chicken': {
      desc: 'Golden chicken in a creamy garlic sauce with spinach and tomatoes doing just enough to make the plate feel fancy.',
      why: 'You picked comfort with treat-yourself energy, and Tuscan chicken gives you restaurant vibes without requiring restaurant plans.',
      steps: ['Season and sear the chicken until browned, then set it aside.', 'Cook garlic and tomatoes in the same pan, then add cream and Parmesan.', 'Stir in spinach until just wilted.', 'Return the chicken to the sauce and simmer gently until cooked through.']
    },
    'Cheesy Broccoli Rice Bake': {
      desc: 'Creamy rice, tender broccoli, and a browned cheesy top that turns inexpensive ingredients into legitimate comfort food.',
      why: 'This is budget-friendly casserole energy: filling, cheesy, and built from ingredients that know how to stretch.',
      steps: ['Cook or reheat the rice and steam the broccoli until just tender.', 'Combine them with a creamy sauce and plenty of shredded cheese.', 'Spread into a baking dish and add another layer of cheese on top.', 'Bake until hot throughout and browned around the edges.']
    },
    'Cajun Chicken Pasta': {
      desc: 'Creamy pasta with Cajun-spiced chicken and enough heat to keep the comfort from getting sleepy.',
      why: 'You still get creamy pasta comfort, but Cajun seasoning keeps the whole plate from playing it safe.',
      steps: ['Season chicken with Cajun seasoning and cook until browned and done.', 'Boil pasta and reserve a little pasta water.', 'Make a quick cream sauce in the chicken pan and stir in Parmesan if available.', 'Toss in the pasta, slice the chicken over top, and adjust seasoning.']
    },
    'Beef Stroganoff Noodles': {
      desc: 'Tender beef and mushrooms in a savory creamy sauce wrapped around noodles that refuse to let any gravy escape.',
      why: 'You wanted comfort without an all-day project, and stroganoff lands squarely in that rich, cozy middle ground.',
      steps: ['Brown thinly sliced beef quickly in a hot skillet, then remove it.', 'Cook onion and mushrooms in the same pan until softened and browned.', 'Add broth and seasoning, then stir in sour cream off the strongest heat.', 'Return the beef, toss with cooked noodles, and finish with black pepper.']
    },
    'Chicken Parm Sandwich': {
      desc: 'Crispy chicken, marinara, and melted mozzarella packed into toasted bread because chicken Parmesan did not need a plate tonight.',
      why: 'You get the cheesy red-sauce comfort of chicken parm in a faster handheld format that still feels like dinner.',
      steps: ['Cook a breaded chicken cutlet until crisp and safely cooked through.', 'Warm marinara and spoon it over the chicken.', 'Top with mozzarella or provolone and melt the cheese.', 'Load everything onto toasted bread and serve before the crust loses its crunch.']
    },
    'Lasagna Rollups': {
      desc: 'Lasagna noodles rolled around cheesy filling, covered in sauce, and baked until every edge starts looking dangerous.',
      why: 'This is full lasagna comfort with built-in portions and enough hands-on energy to feel worth the effort.',
      steps: ['Boil lasagna noodles until flexible, then lay them flat.', 'Spread each noodle with ricotta mixture and a little mozzarella.', 'Roll them up, arrange in marinara, and spoon more sauce over the top.', 'Add cheese and bake until bubbling and browned.']
    },
    'Bacon Cheeseburger Bowl': {
      desc: 'All the salty, cheesy burger parts piled into a bowl without needing a bun to hold the meeting together.',
      why: 'Burger craving plus medium effort equals a bowl that gets to the good parts faster.',
      steps: ['Brown ground beef with salt, pepper, and any burger seasoning you like.', 'Cook or warm your base, such as potatoes, rice, or lettuce.', 'Pile on beef, cheese, bacon, pickles, onions, and tomatoes.', 'Finish with ketchup, mustard, burger sauce, or a drizzle of your favorite dressing.']
    },
    'Honey Garlic Chicken Bowl': {
      desc: 'Sticky-sweet garlic chicken over rice with enough sauce to make the vegetables worth inviting.',
      why: 'This is an easy middle-ground pick: familiar chicken, big flavor, and a bowl that feels more put together than the effort suggests.',
      steps: ['Cut and season the chicken, then cook until browned.', 'Stir together honey, soy sauce, garlic, and a splash of water.', 'Pour the sauce into the pan and simmer until glossy and the chicken is cooked through.', 'Serve over rice with vegetables and spoon extra sauce over everything.']
    }
  };

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

  const hasPlaceholderSteps = meal => Array.isArray(meal.steps) && meal.steps.length === 4 &&
    placeholderStepSets.some(set => set.every((step, index) => meal.steps[index] === step));

  const photoForMeal = meal => {
    const name = String(meal.name || '').toLowerCase();
    const category = String(meal.category || '').toLowerCase();
    if (name.includes('pizza') && name.includes('wing')) return 'pizza-wings';
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

  const contextualSteps = meal => {
    const name = String(meal.name || '').toLowerCase();
    const category = String(meal.category || '').toLowerCase();
    if (/(pasta|alfredo|spaghetti|mac|noodle)/.test(name)) return ['Boil the pasta or noodles until just tender, then drain.', 'Cook or warm the protein and vegetables you are using.', 'Add the sauce and seasoning, loosening with a splash of pasta water if needed.', 'Toss everything together and finish with cheese, herbs, or pepper.'];
    if (/(taco|quesadilla|nacho|burrito|wrap)/.test(name)) return ['Cook or warm the filling and season it well.', 'Warm the tortilla, chips, or wrap so it is ready to build.', 'Add cheese, vegetables, sauce, and the cooked filling.', 'Fold, toast, or pile it up, then finish with salsa, lime, or hot sauce.'];
    if (/(rice|bowl)/.test(name)) return ['Cook or reheat the rice or other bowl base.', 'Cook and season the main protein or vegetables.', 'Add the sauce or seasoning while everything is hot.', 'Build the bowl and finish with something fresh, crunchy, or spicy.'];
    if (/(sandwich|burger|melt|toast|biscuit)/.test(name)) return ['Prepare and season the filling or protein.', 'Toast or warm the bread until the edges have some color.', 'Layer the filling with cheese, sauce, and any toppings you want.', 'Close it up, slice if needed, and serve while everything is hot.'];
    if (/(soup|stew|chili)/.test(name)) return ['Cook the aromatics or vegetables until they start to soften.', 'Add the main ingredients plus broth, tomatoes, or your preferred liquid.', 'Simmer until everything is tender and the flavors come together.', 'Taste, adjust the seasoning, and finish with your favorite toppings.'];
    if (/(egg|omelet|breakfast|pancake|waffle)/.test(name) || category.includes('breakfast')) return ['Get the main breakfast ingredients ready and heat your pan or appliance.', 'Cook the eggs, batter, or protein until done to your liking.', 'Add cheese, seasoning, fruit, syrup, or toppings while everything is warm.', 'Plate it immediately and serve before breakfast turns into lunch.'];
    if (/(chicken|salmon|fish|shrimp|steak|pork|meatloaf|turkey)/.test(name)) return ['Season the main protein on all sides.', 'Cook it by skillet, oven, grill, or air fryer until safely cooked through.', 'Add or brush on the sauce during the final part of cooking.', 'Let it rest briefly, then serve with the easiest side that fits the plate.'];
    return null;
  };

  const universalSteps = meal => {
    const name = String(meal.name || 'this meal');
    return [
      meal.energy === 'low' ? 'Keep this as low-effort as possible and use ready-to-eat or pre-cooked ingredients where they make sense.' : 'Get the ingredients and any needed pan, bowl, or appliance ready before you start.',
      `Prepare the main parts of ${name} in the simplest way that fits the ingredients—cook what needs cooking and leave ready-to-eat items cold.`,
      'Combine everything, then add seasoning, sauce, or toppings a little at a time so you can taste as you go.',
      'Serve once the cooked components are safely done and the texture tastes right; add something fresh, crunchy, or spicy if it needs a finish.'
    ];
  };

  meals.forEach(meal => {
    const patch = curated[meal.name];
    if (patch) Object.assign(meal, patch);

    const betterPhoto = photoForMeal(meal);
    if (betterPhoto) meal.photo = betterPhoto;

    if (!patch && genericDescriptions.has(meal.desc)) meal.desc = descriptionForMeal(meal);

    if (typeof meal.why === 'string' && meal.why.startsWith('This variation keeps')) {
      const mood = Array.isArray(meal.mood) ? meal.mood[0] : meal.mood;
      const budget = meal.budget === 'cheap' ? 'budget-friendly' : meal.budget === 'treat' ? 'treat-yourself' : 'normal-budget';
      const effort = meal.energy === 'low' ? 'low-effort' : meal.energy === 'high' ? 'higher-effort' : 'middle-effort';
      meal.why = `${meal.name} keeps the ${mood || 'food'} vibe, stays ${budget}, and fits a ${effort} night in about ${meal.time}.`;
    }

    if (!patch && hasPlaceholderSteps(meal)) {
      meal.steps = contextualSteps(meal) || universalSteps(meal);
    }
  });

  if (typeof renderHome === 'function') renderHome();
  if (typeof renderFeed === 'function') renderFeed();
  if (typeof renderProfile === 'function') renderProfile();
})();
