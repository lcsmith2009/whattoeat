(() => {
  if (typeof meals === 'undefined' || !Array.isArray(meals)) return;

  const curated = {
    'Butter Noodles Supreme': {
      desc: 'Buttery noodles, black pepper, and whatever Parmesan or seasoning you can shake loose. Cheap, fast, undefeated.',
      why: 'You need dinner in single-digit minutes, and butter noodles know better than to overcomplicate a broke night.',
      steps: ['Boil noodles until tender, then drain and save a splash of the cooking water.', 'Toss the hot noodles with butter until glossy.', 'Add Parmesan, garlic powder, black pepper, or whatever seasoning you have.', 'Loosen with a spoonful of pasta water if needed and eat while it is hot.']
    },
    'Ramen Egg Upgrade': {
      desc: 'Instant ramen with an egg turning five-minute noodles into something that actually feels like a meal.',
      why: 'The ramen is already cheap and fast; the egg gives it just enough protein and substance to stop feeling like a snack.',
      steps: ['Cook the ramen according to the package, using a little less seasoning if you prefer.', 'During the final minute, crack in an egg or add a separately cooked egg.', 'Stir gently for ribbons or leave it whole to poach.', 'Finish with hot sauce, scallions, sesame oil, or any leftover vegetables you have.']
    },
    'Microwave Quesadilla': {
      desc: 'A tortilla, melted cheese, and two minutes of effort standing between you and ordering something expensive.',
      why: 'This is exactly what low-energy broke mode needs: hot, cheesy, and finished before second thoughts arrive.',
      steps: ['Place cheese over one half of a tortilla and add any ready-to-eat extras you want.', 'Fold the tortilla over and microwave until the cheese melts.', 'Let it sit briefly so the filling stops trying to escape.', 'Cut into wedges and add salsa, hot sauce, or sour cream if available.']
    },
    'Tuna Rice Bowl': {
      desc: 'Warm rice topped with seasoned tuna and whatever crunchy or spicy extras are still hanging around.',
      why: 'Rice stretches the meal, canned tuna handles the protein, and the whole thing comes together without turning on much more than a microwave.',
      steps: ['Heat leftover or microwave rice until steaming.', 'Drain the tuna and mix it with mayo, soy sauce, hot sauce, or seasoning to taste.', 'Spoon the tuna over the rice.', 'Finish with cucumber, pickles, seaweed, scallions, or anything crunchy if you have it.']
    },
    'Hot Dog Mac Bowl': {
      desc: 'Creamy boxed mac with sliced hot dogs because sometimes the budget meal absolutely understands the assignment.',
      why: 'It is cheap, filling, familiar, and uses two pantry/freezer staples that were clearly destined to meet.',
      steps: ['Prepare the macaroni and cheese according to the package.', 'Slice the hot dogs and heat or brown them in a skillet or microwave.', 'Stir the hot dog pieces into the finished mac.', 'Add black pepper, hot sauce, or extra cheese if you want to upgrade it.']
    },
    'Peanut Butter Toast Plate': {
      desc: 'Crunchy toast with peanut butter doing more heavy lifting than a three-minute meal has any right to do.',
      why: 'When money, energy, and patience are all low, peanut butter toast still gives you something fast and legitimately filling.',
      steps: ['Toast the bread to your preferred level of crispness.', 'Spread peanut butter over the warm toast.', 'Add banana, jelly, honey, cinnamon, or a pinch of salt if you have it.', 'Serve with fruit, milk, or whatever easy side is already available.']
    },
    'Cereal at 1AM': {
      desc: 'Cold cereal at an irresponsible hour, because late-night hunger did not request a cooking demonstration.',
      why: 'You are hungry, it is late, and the fastest correct answer is sometimes just a bowl and a spoon.',
      steps: ['Grab a bowl and pour in the cereal.', 'Add milk or your preferred alternative.', 'Throw in fruit, nuts, or peanut butter if you want more staying power.', 'Eat immediately and return to whatever questionable 1AM decision came before this.']
    },
    'Bean & Cheese Burrito': {
      desc: 'Warm beans and melted cheese wrapped in a tortilla: inexpensive ingredients behaving like a proper meal.',
      why: 'Beans bring the filling part, cheese brings morale, and the tortilla keeps the whole budget operation portable.',
      steps: ['Warm the beans and season them to taste.', 'Place beans and shredded cheese down the center of a tortilla.', 'Fold in the sides and roll the burrito tightly.', 'Microwave or toast in a skillet until hot and the cheese has melted.']
    },
    'Freezer Pizza Revival': {
      desc: 'Frozen pizza with a few strategic upgrades so it tastes less like surrender and more like a plan.',
      why: 'You already bought the shortcut; a couple extra toppings or seasonings can make it feel dramatically less lazy.',
      steps: ['Bake the frozen pizza according to the package instructions.', 'Before baking, add extra cheese, pepperoni, vegetables, or seasoning if you have them.', 'Cook until the crust is crisp and the cheese is bubbling.', 'Finish with hot honey, red pepper flakes, Parmesan, or garlic seasoning.']
    },
    'Egg Fried Rice-ish': {
      desc: 'Leftover rice, scrambled egg, soy sauce, and enough confidence to ignore whether a takeout chef would approve.',
      why: 'Cold rice and an egg can become a real hot meal in ten minutes without buying anything new.',
      steps: ['Heat a little oil in a skillet and scramble the egg, then move it aside.', 'Add cold leftover rice and break up any clumps.', 'Season with soy sauce, pepper, garlic, or whatever savory seasoning you have.', 'Stir the egg back through and add frozen vegetables or leftover protein if available.']
    },
    'Spaghetti with Jar Sauce': {
      desc: 'Straightforward spaghetti and jarred sauce because not every pasta night needs a family secret.',
      why: 'This is cheap pantry reliability: boil noodles, heat sauce, eat dinner, keep moving.',
      steps: ['Boil spaghetti in salted water until tender, then drain.', 'Warm the jarred sauce in a saucepan or microwave.', 'Taste the sauce and add garlic, herbs, pepper, or red pepper flakes if needed.', 'Toss with the pasta and finish with Parmesan or shredded cheese if available.']
    },
    'Chips & Cheese Plate': {
      desc: 'Tortilla chips under melted cheese: technically simple, emotionally effective.',
      why: 'When the budget is disrespectful and the energy is worse, hot cheese over chips can still get the job done.',
      steps: ['Spread tortilla chips in a microwave-safe plate or small baking tray.', 'Scatter shredded cheese evenly over the chips.', 'Microwave or bake just until the cheese melts.', 'Add salsa, hot sauce, jalapeños, beans, or sour cream if you have them.']
    },
    'Leftover Rice Rescue': {
      desc: 'Yesterday’s rice getting a second career with sauce, seasoning, and whatever leftovers need somewhere to go.',
      why: 'The cheapest meal is often the food you already paid for, and leftover rice is built for reinvention.',
      steps: ['Reheat the rice until steaming, adding a splash of water if it is dry.', 'Warm any leftover protein or vegetables you want to use.', 'Stir in sauce or seasoning such as soy sauce, hot sauce, curry seasoning, or gravy.', 'Top with an egg, cheese, herbs, or something crunchy if available.']
    },
    'Canned Chili Nachos': {
      desc: 'Crunchy chips buried under hot canned chili and melted cheese in the best possible low-budget way.',
      why: 'One can of chili turns snack ingredients into something filling enough to call dinner without an argument.',
      steps: ['Heat the canned chili until hot throughout.', 'Spread tortilla chips on a plate or tray.', 'Spoon chili over the chips and cover with shredded cheese.', 'Melt the cheese, then add jalapeños, onions, salsa, or sour cream if available.']
    },
    'Toast Pizza': {
      desc: 'Crisp toast with sauce and melted cheese for when pizza money and pizza patience are both unavailable.',
      why: 'Bread, sauce, and cheese get you surprisingly close to the craving with almost no cost or commitment.',
      steps: ['Toast the bread lightly so it can handle the toppings.', 'Spread on pizza sauce, marinara, or a thin layer of seasoned tomato sauce.', 'Add shredded cheese and any small toppings you have.', 'Bake, air-fry, or broil briefly until the cheese melts and the edges crisp.']
    },
    'Nuggets & Fries Combo': {
      desc: 'Crispy nuggets and fries from the freezer: the unofficial restaurant at home for people who are done trying.',
      why: 'Low energy deserves food that mostly cooks itself, and this combo delivers maximum familiarity for minimal movement.',
      steps: ['Arrange frozen nuggets and fries in an air fryer, oven, or other appliance according to package directions.', 'Cook until both are hot and crisp, turning if needed.', 'Season the fries immediately after cooking.', 'Serve with whatever dipping sauces make the freezer meal feel intentional.']
    },
    'Instant Mashed Potato Bowl': {
      desc: 'Instant mashed potatoes turned into a loaded bowl with gravy, cheese, leftovers, or anything else willing to participate.',
      why: 'The base costs almost nothing, takes minutes, and can carry whatever scraps are left in the fridge.',
      steps: ['Prepare the instant mashed potatoes according to the package.', 'Season them with butter, pepper, garlic, or cheese if available.', 'Top with warmed leftovers, canned corn, gravy, beans, or another easy add-on.', 'Finish with hot sauce, scallions, or shredded cheese.']
    },
    'Sardine Crackers Snack Plate': {
      desc: 'Sardines, crackers, and something sharp or acidic on the side: zero cooking, plenty of actual flavor.',
      why: 'This is a pantry meal that costs little, needs no stove, and brings more protein than its snack-plate appearance suggests.',
      steps: ['Drain the sardines if needed and place them on a plate.', 'Add crackers alongside them.', 'Season with hot sauce, lemon, mustard, pepper, or vinegar if available.', 'Add pickles, cucumber, cheese, or fruit to round out the plate.']
    },
    'Rice, Egg & Hot Sauce': {
      desc: 'Hot rice, a runny or fried egg, and hot sauce proving three cheap things can absolutely make dinner.',
      why: 'Rice handles the bulk, the egg handles the protein, and hot sauce makes the budget feel less personal.',
      steps: ['Heat the rice until steaming.', 'Fry, scramble, or soft-cook an egg the way you like it.', 'Place the egg over the rice and season with salt and pepper.', 'Add hot sauce generously and finish with soy sauce or scallions if available.']
    },
    'Dollar Store Taco Bowl': {
      desc: 'Seasoned rice or beans, crunchy chips, cheese, and salsa assembled from cheap ingredients with expensive confidence.',
      why: 'A taco bowl lets low-cost pantry ingredients stack together into something more satisfying than eating each one separately.',
      steps: ['Heat rice, beans, or both for the base.', 'Season the base with taco seasoning, salsa, or hot sauce.', 'Add cheese, crushed tortilla chips, canned corn, or any available toppings.', 'Finish with salsa or sauce and eat while the crunchy parts are still crunchy.']
    }
  };

  Object.entries(curated).forEach(([name, patch]) => {
    const meal = meals.find(item => item.name === name);
    if (meal) Object.assign(meal, patch);
  });

  window.WTE_CATALOG_CURATED_BATCHES = Object.freeze([
    ...new Set([...(window.WTE_CATALOG_CURATED_BATCHES || []), 3])
  ]);
})();
