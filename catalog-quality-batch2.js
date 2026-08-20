(() => {
  if (typeof meals === 'undefined' || !Array.isArray(meals)) return;

  const curated = {
    'Fried Catfish Plate': {
      desc: 'Crispy seasoned catfish with proper sides—the kind of plate that makes tartar sauce feel optional, not necessary.',
      why: 'You wanted comfort with treat-yourself energy, and fried catfish delivers crunch, seasoning, and an actual sit-down plate.',
      steps: ['Pat the catfish dry and season it well.', 'Coat in seasoned cornmeal or fish breading.', 'Fry in hot oil until crisp and safely cooked through.', 'Drain briefly and serve with lemon, hot sauce, and your favorite sides.']
    },
    'Shrimp & Grits': {
      desc: 'Creamy grits topped with savory shrimp and enough pan sauce to make every spoonful count.',
      why: 'This is comfort food with a little occasion energy—rich, warm, and worth the extra few minutes.',
      steps: ['Cook grits until creamy and season with butter, cheese, salt, and pepper.', 'Season the shrimp and sauté quickly until just cooked.', 'Build a quick pan sauce with garlic, butter, seasoning, and a splash of broth if needed.', 'Spoon shrimp and sauce over the hot grits and serve immediately.']
    },
    'Red Beans & Rice': {
      desc: 'Slow-simmered red beans, smoky seasoning, and rice doing exactly what cheap comfort food is supposed to do.',
      why: 'You wanted something filling and budget-friendly; beans and rice stretch beautifully without tasting like a compromise.',
      steps: ['Cook onion, celery, bell pepper, and garlic until softened.', 'Add red beans, seasoning, smoked sausage if using, and enough liquid to simmer.', 'Cook until the beans are tender and the mixture is thick and flavorful.', 'Serve over hot rice and finish with hot sauce or scallions.']
    },
    'Chicken & Waffles': {
      desc: 'Crispy chicken on a warm waffle with syrup, hot sauce, or both because choosing one was never required.',
      why: 'Sweet, salty, crispy comfort is the assignment, and chicken and waffles understands it immediately.',
      steps: ['Cook the chicken until crisp and safely cooked through.', 'Prepare or warm the waffles until hot with crisp edges.', 'Stack the chicken over the waffles.', 'Finish with syrup, hot honey, butter, or hot sauce to taste.']
    },
    'Oxtail Rice Bowl': {
      desc: 'Tender braised oxtail and rich gravy over rice—the bowl you choose when patience is part of the flavor.',
      why: 'This is high-effort, treat-yourself comfort, and the payoff is meat that should practically surrender to the fork.',
      steps: ['Season and deeply brown the oxtails in batches.', 'Cook onion, garlic, herbs, and aromatics in the same pot.', 'Add broth and braise low and slow until the oxtails are very tender.', 'Skim excess fat, adjust the gravy, and serve over hot rice.']
    },
    'Turkey Wings & Rice': {
      desc: 'Slow-cooked turkey wings with savory pan gravy over rice built to catch every drop.',
      why: 'You have the energy for a real comfort-food cook, and turkey wings reward the wait with fall-apart tenderness.',
      steps: ['Season the turkey wings generously and brown if desired.', 'Place with onion, broth, and seasonings in a covered baking dish or pot.', 'Cook low and slow until tender and safely cooked through.', 'Turn the cooking liquid into gravy if needed and spoon everything over rice.']
    },
    'Collard Greens Plate': {
      desc: 'Tender seasoned collards with smoky depth, served like a side dish that finally got promoted to main-character status.',
      why: 'You wanted soulful comfort, and a properly seasoned greens plate brings slow-cooked flavor without needing fancy ingredients.',
      steps: ['Wash the collards thoroughly and remove the tough stems.', 'Cook onion and a smoky seasoning base or smoked meat until fragrant.', 'Add greens and broth, then simmer until tender.', 'Taste for salt, acid, heat, and sweetness before serving with your preferred sides.']
    },
    'Cornbread Chili Bowl': {
      desc: 'Thick savory chili with sweet cornbread crumbled, dunked, or parked right on top where it belongs.',
      why: 'Cheap, filling, and built for comfort—this turns one pot of chili into a full decision with almost no ceremony.',
      steps: ['Brown the meat or warm the beans with onion and chili seasoning.', 'Add tomatoes and enough liquid to simmer until thick.', 'Bake or warm cornbread while the chili cooks.', 'Serve the chili in bowls and add cornbread on the side or crumbled over top.']
    },
    'Hot Honey Wings': {
      desc: 'Crispy wings glazed with sticky hot honey—the sweet-heat situation that makes napkins part of the meal plan.',
      why: 'You picked chaos with comfort on the side, and hot honey wings are exactly the right amount of unnecessary.',
      steps: ['Season the wings and cook until crisp and safely cooked through by oven, air fryer, or frying.', 'Warm honey with hot sauce or chili flakes and a little butter.', 'Toss the hot wings in the glaze until evenly coated.', 'Serve immediately with extra hot honey or cooling dip if you want it.']
    },
    'Fried Whiting Sandwich': {
      desc: 'Crispy fried whiting tucked into soft bread with the simple toppings that know better than to overcomplicate it.',
      why: 'You wanted cheap comfort fast, and a fish sandwich gets you crunchy, salty satisfaction without a whole production.',
      steps: ['Season the whiting and coat it lightly in seasoned breading.', 'Fry until crisp and safely cooked through.', 'Warm or toast the bread and add sauce, pickles, slaw, or lettuce.', 'Build the sandwich and serve while the fish is still crunchy.']
    },
    'Cabbage & Smoked Sausage': {
      desc: 'Tender cabbage cooked down with smoky sausage, onions, and enough seasoning to make a cheap skillet feel complete.',
      why: 'This is budget comfort with one-pan energy—filling, savory, and built from ingredients that stretch.',
      steps: ['Brown sliced smoked sausage and remove it briefly.', 'Cook onion and chopped cabbage in the same pan until it starts to soften.', 'Add seasoning and a splash of broth or water, then cover and cook until tender.', 'Return the sausage, toss everything together, and adjust seasoning before serving.']
    },
    'Jambalaya Bowl': {
      desc: 'Seasoned rice loaded with sausage, chicken, shrimp, or whatever combination showed up ready to work.',
      why: 'You wanted comfort with big flavor, and jambalaya turns one pot into a full, smoky, spicy meal.',
      steps: ['Brown the sausage and other proteins in a heavy pot.', 'Cook onion, bell pepper, celery, garlic, and Cajun seasoning in the drippings.', 'Add rice, tomatoes or broth as your recipe calls for, then simmer covered until tender.', 'Fold in quick-cooking shrimp near the end and adjust seasoning before serving.']
    },
    'Gumbo Cup': {
      desc: 'Dark, savory gumbo packed with layered flavor in a smaller serving that still tastes like somebody took their time.',
      why: 'This is treat-yourself comfort for when you want deep flavor more than you want speed.',
      steps: ['Cook flour and fat into a deep brown roux without letting it burn.', 'Add onion, celery, bell pepper, garlic, and seasoning.', 'Slowly add stock plus sausage, chicken, or seafood as appropriate and simmer until developed.', 'Finish with filé or okra if using, taste carefully, and serve with rice.']
    },
    'BBQ Rib Tips': {
      desc: 'Tender little rib pieces glazed in sticky barbecue sauce with charred edges doing most of the talking.',
      why: 'You wanted comfort and treat-yourself flavor without committing to a full rack of ribs.',
      steps: ['Season the rib tips and cook low and slow until nearly tender.', 'Brush with barbecue sauce during the final stage of cooking.', 'Raise the heat briefly to caramelize the sauce around the edges.', 'Rest for a few minutes, then serve with extra sauce and easy sides.']
    },
    'Loaded Fries with Chicken': {
      desc: 'Crispy fries buried under seasoned chicken, cheese, sauce, and toppings until the fork becomes mandatory.',
      why: 'This is chaos comfort done correctly: crispy, cheesy, saucy, and absolutely not pretending to be subtle.',
      steps: ['Cook the fries until deeply crisp so they can survive the toppings.', 'Season and cook the chicken, then chop or slice it.', 'Pile chicken and cheese over the fries and melt the cheese if needed.', 'Finish with sauce, scallions, jalapeños, bacon, or whatever level of chaos you chose.']
    },
    'Cajun Salmon Rice': {
      desc: 'Cajun-spiced salmon over rice with bold flavor that still lets you feel like you made a responsible decision.',
      why: 'You wanted something lighter without eating sadness, and seasoned salmon over rice lands right in that sweet spot.',
      steps: ['Season the salmon generously with Cajun seasoning.', 'Cook by skillet, oven, or air fryer until safely done and still moist.', 'Prepare or reheat the rice and any vegetables you want alongside it.', 'Serve the salmon over rice and finish with lemon, herbs, or a light sauce.']
    },
    'Seafood Mac Bowl': {
      desc: 'Creamy baked-style mac loaded with seafood because regular mac and cheese apparently was not showing off enough.',
      why: 'You picked full comfort with treat-yourself energy, and seafood mac is unapologetically both.',
      steps: ['Cook the pasta until just tender and prepare a creamy cheese sauce.', 'Cook the seafood only until just done so it stays tender.', 'Fold the seafood and pasta into the cheese sauce.', 'Serve creamy from the pot or bake briefly with extra cheese for a browned top.']
    },
    'Fried Chicken Biscuit': {
      desc: 'Crispy chicken tucked inside a buttery biscuit with hot honey, gravy, or plain confidence holding it together.',
      why: 'You wanted fast comfort with breakfast energy, and a chicken biscuit handles that without asking what time it is.',
      steps: ['Cook the chicken until crisp and safely cooked through.', 'Warm or split a fresh biscuit.', 'Add the chicken plus hot honey, butter, pickles, or gravy if desired.', 'Close it up and serve immediately while the contrast is still right.']
    },
    'Smothered Chicken Rice': {
      desc: 'Tender chicken under savory onion gravy, spooned over rice that was clearly designed for this exact purpose.',
      why: 'This is straight comfort-food logic: tender chicken, gravy, rice, and absolutely no need to overthink dinner.',
      steps: ['Season and brown the chicken, then set it aside.', 'Cook sliced onion in the same pan and stir in a little flour.', 'Slowly add broth to create a smooth gravy.', 'Return the chicken and simmer until safely cooked through, then serve over rice.']
    },
    'Pepper Steak Rice': {
      desc: 'Tender strips of beef, peppers, onions, and savory sauce over rice for the nights when takeout energy needs a home-cooked answer.',
      why: 'You wanted familiar comfort at medium effort, and pepper steak gives you saucy beef-and-rice satisfaction without a long cook.',
      steps: ['Slice the beef thinly and season it.', 'Sear the beef quickly, then remove it before it overcooks.', 'Stir-fry peppers and onions, then add sauce and return the beef.', 'Simmer briefly until glossy and serve immediately over hot rice.']
    }
  };

  meals.forEach(meal => {
    const patch = curated[meal.name];
    if (patch) Object.assign(meal, patch);
  });

  if (typeof renderHome === 'function') renderHome();
  if (typeof renderFeed === 'function') renderFeed();
  if (typeof renderProfile === 'function') renderProfile();
})();
