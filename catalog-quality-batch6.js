(() => {
  if (typeof meals === 'undefined' || !Array.isArray(meals)) return;

  const curated = {
    'Air Fryer Chicken Tenders': {
      desc: 'Crispy chicken tenders without turning the stove into a whole event.',
      why: 'You wanted something easy and dependable, and the air fryer handles most of the work while still giving you crunch.',
      steps: ['Season or bread the chicken tenders, or use frozen tenders if that is the level of effort today.', 'Arrange in a single layer in the air fryer basket.', 'Cook until crisp and safely cooked through, flipping once if needed.', 'Serve with your favorite dipping sauce and call dinner handled.']
    },
    'Air Fryer Salmon Bites': {
      desc: 'Crispy-edged salmon pieces with big flavor and very little cleanup.',
      why: 'This gives you a protein-forward meal with enough texture to feel fun without turning dinner into a project.',
      steps: ['Cut salmon into bite-size pieces and pat dry.', 'Season with oil and your favorite spice blend.', 'Air fry in a single layer until browned and cooked through.', 'Finish with lemon, sauce, or herbs and serve with rice or vegetables if you want more.']
    },
    'Air Fryer Pizza Rolls': {
      desc: 'Hot, crispy pizza rolls for when the freezer already made most of the decisions for you.',
      why: 'Low effort, fast payoff, and no reason to dirty more cookware than absolutely necessary.',
      steps: ['Place frozen pizza rolls in the air fryer basket in a single layer.', 'Cook until crisp and piping hot, shaking once halfway through.', 'Let them rest for a minute so the filling stops being molten lava.', 'Serve with marinara or ranch if that is part of the plan.']
    },
    'Crispy Potato Wedges': {
      desc: 'Golden potato wedges with crisp edges and enough seasoning to carry the whole plate.',
      why: 'Cheap potatoes plus an air fryer is one of the easiest ways to turn almost nothing into something satisfying.',
      steps: ['Cut potatoes into wedges and pat them dry.', 'Toss with a little oil, salt, pepper, and any seasoning you like.', 'Air fry in a single layer until browned and tender inside, shaking halfway through.', 'Serve with ketchup, garlic sauce, ranch, or whatever dip is doing the heavy lifting.']
    },
    'Air Fryer Shrimp Tacos': {
      desc: 'Seasoned shrimp tucked into warm tortillas with crunchy toppings and very little kitchen drama.',
      why: 'This feels fresher than a freezer meal but still comes together fast enough for a lazy night.',
      steps: ['Season peeled shrimp with oil and taco seasoning or your preferred spices.', 'Air fry until pink, firm, and lightly browned.', 'Warm tortillas while the shrimp cooks.', 'Build tacos with shrimp, slaw or lettuce, salsa, lime, and sauce.']
    },
    'Frozen Dumpling Bowl': {
      desc: 'Crispy dumplings turned into a full bowl with whatever vegetables, rice, or sauce you already have.',
      why: 'Frozen dumplings do the hard part for you, and the bowl format makes them feel like an actual meal.',
      steps: ['Cook the frozen dumplings in the air fryer or according to the package until hot and crisp.', 'Warm rice, noodles, or vegetables for the base.', 'Add the dumplings and drizzle with soy sauce, chili crisp, or another quick sauce.', 'Finish with scallions, sesame seeds, cucumber, or anything fresh you have.']
    },
    'Air Fryer Hot Wings': {
      desc: 'Crispy wings with enough heat to make a lazy meal feel like a decision.',
      why: 'You wanted chaos with minimal cleanup, and hot wings are very good at both.',
      steps: ['Pat wings dry and season them well.', 'Air fry until browned, crisp, and safely cooked through, turning or shaking halfway through.', 'Toss the hot wings with buffalo, hot honey, or your favorite spicy sauce.', 'Serve immediately with ranch, blue cheese, celery, or none of the above.']
    },
    'Crispy Fish Sandwich': {
      desc: 'Crispy fish, soft bread, and cool sauce doing a fast-food impression from your own kitchen.',
      why: 'It gives you sandwich comfort without requiring a full frying setup or much cleanup.',
      steps: ['Air fry a breaded fish fillet until crisp and cooked through.', 'Toast or warm the bun while the fish finishes.', 'Add lettuce, pickles, and tartar sauce or your favorite spread.', 'Stack the sandwich and eat it while the fish is still crunchy.']
    },
    'Air Fryer Garlic Bread Pizza': {
      desc: 'Garlic bread topped with sauce and cheese because sometimes shortcuts deserve applause.',
      why: 'You get pizza energy in about ten minutes using ingredients that barely require instructions.',
      steps: ['Top garlic bread with a thin layer of pizza sauce.', 'Add mozzarella and any quick toppings you want.', 'Air fry until the bread is crisp and the cheese is bubbling.', 'Let it cool for a minute, slice, and eat before anyone suggests making dough.']
    },
    'Lazy Chicken Wrap': {
      desc: 'Chicken, something crunchy, and sauce rolled into a tortilla before hunger turns into a meeting.',
      why: 'This is exactly what leftover or pre-cooked chicken is for: fast food without the drive-thru.',
      steps: ['Warm or cook the chicken you are using.', 'Lay out a tortilla and add lettuce, cheese, vegetables, or anything crunchy.', 'Add the chicken and drizzle with your preferred sauce.', 'Wrap tightly, toast briefly if you want, and serve.']
    },
    'Crispy Brussels Snack': {
      desc: 'Brussels sprouts with dark crispy edges that make vegetables act suspiciously snackable.',
      why: 'You wanted something lighter without surrendering crunch, and the air fryer handles that trade perfectly.',
      steps: ['Trim and halve the Brussels sprouts, then pat them dry.', 'Toss with a little oil, salt, pepper, and optional garlic or seasoning.', 'Air fry until deeply browned at the edges and tender inside.', 'Finish with Parmesan, lemon, balsamic, or hot sauce.']
    },
    'Air Fryer Breakfast Hash': {
      desc: 'Crispy potatoes, breakfast meat, and eggs pulled together with one appliance and almost no patience.',
      why: 'This gives you a real breakfast plate without standing over a skillet the whole time.',
      steps: ['Dice potatoes small and toss with oil and seasoning.', 'Air fry until nearly tender, then add cooked sausage, peppers, or onions if using.', 'Continue cooking until everything is browned and hot.', 'Top with a fried or scrambled egg, or serve the hash as-is.']
    },
    'Frozen Burger Upgrade': {
      desc: 'A freezer burger dressed up enough to stop feeling like an emergency meal.',
      why: 'The patty is already handled, so your only job is making the toppings do some actual work.',
      steps: ['Cook the frozen burger patty in the air fryer until safely cooked through.', 'Add cheese during the final minute if you want it melted.', 'Toast the bun and gather pickles, onions, lettuce, or sauce.', 'Build the burger and serve with the easiest side available.']
    },
    'Air Fryer Crab Cakes': {
      desc: 'Crispy crab cakes with minimal oil and enough seafood energy to feel like a treat.',
      why: 'This keeps the seafood indulgence while skipping the pan-frying mess.',
      steps: ['Lightly oil chilled crab cakes or use prepared frozen ones.', 'Place in the air fryer with space between them.', 'Cook until browned outside and hot through the center.', 'Serve with lemon, tartar sauce, remoulade, or a quick salad.']
    },
    'Crispy Calamari Snack': {
      desc: 'Crispy calamari bites without dedicating the kitchen to a vat of oil.',
      why: 'You get restaurant-snack energy with far less cleanup and commitment.',
      steps: ['Use breaded calamari or lightly coat calamari rings with seasoned breadcrumbs.', 'Arrange in a single layer and lightly spray with oil if needed.', 'Air fry until crisp and cooked through without overcooking.', 'Serve immediately with marinara, lemon, or your favorite dipping sauce.']
    },
    'Toasted Turkey Melt': {
      desc: 'Hot turkey, melted cheese, and crisp bread for when a cold sandwich is not emotionally sufficient.',
      why: 'It is still basically a sandwich, but a little heat makes it feel like dinner actually showed up.',
      steps: ['Layer turkey and cheese between slices of bread with mustard or another spread.', 'Lightly butter or oil the outside of the bread.', 'Air fry or toast until the bread is crisp and the cheese melts.', 'Slice and serve immediately.']
    },
    'Air Fryer Quesadilla': {
      desc: 'A crisp tortilla packed with melted cheese and whatever filling is easiest to justify.',
      why: 'It turns fridge scraps into something hot and crunchy in under ten minutes.',
      steps: ['Add cheese and any cooked filling to one half of a tortilla.', 'Fold the tortilla and lightly brush or spray the outside with oil if desired.', 'Air fry until crisp and the cheese is fully melted, flipping once if needed.', 'Cut into wedges and serve with salsa, sour cream, or hot sauce.']
    },
    'Crispy Ravioli Bites': {
      desc: 'Breaded ravioli turned crispy outside and cheesy inside, built specifically for dipping.',
      why: 'This takes frozen or refrigerated ravioli and gives it snack-bar energy with almost no prep.',
      steps: ['Use breaded ravioli, or dip ravioli in egg and seasoned breadcrumbs.', 'Arrange in the air fryer without overlapping.', 'Cook until crisp and hot through the center.', 'Serve with warm marinara for dipping.']
    },
    'Air Fryer Breakfast Sausage Plate': {
      desc: 'Browned breakfast sausage with whatever eggs, toast, or fruit you can manage beside it.',
      why: 'The air fryer handles the greasy part while you decide how ambitious the rest of breakfast needs to be.',
      steps: ['Place sausage links or patties in the air fryer basket.', 'Cook until browned and safely heated through, turning once if needed.', 'Prepare eggs, toast, fruit, or another easy side while the sausage cooks.', 'Plate everything together and serve hot.']
    },
    'Frozen Fries Loaded Up': {
      desc: 'Crispy frozen fries buried under cheese, sauce, and toppings until they become the whole meal.',
      why: 'This is maximum payoff from minimum effort: the freezer handles the base and toppings handle the personality.',
      steps: ['Air fry frozen fries until very crisp.', 'Transfer to a heat-safe plate or basket and add cheese plus any cooked toppings.', 'Return briefly to the heat if needed to melt the cheese.', 'Finish with sauce, scallions, jalapeños, bacon, chicken, or whatever makes the pile make sense.']
    }
  };

  meals.forEach(meal => {
    const patch = curated[meal.name];
    if (patch) Object.assign(meal, patch);
  });
})();
