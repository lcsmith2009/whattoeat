(() => {
  const jsonDefaults = {
    wte_picks: {},
    wte_saved: [],
    wte_history: [],
    wte_moodCounts: {}
  };

  Object.entries(jsonDefaults).forEach(([key, fallback]) => {
    const raw = localStorage.getItem(key);
    if (raw === null) return;

    try {
      const parsed = JSON.parse(raw);
      const expectsArray = Array.isArray(fallback);
      const validShape = expectsArray
        ? Array.isArray(parsed)
        : parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);

      if (!validShape) {
        localStorage.setItem(key, JSON.stringify(fallback));
      }
    } catch (error) {
      console.warn(`WhatToEat repaired invalid local data for ${key}.`, error);
      localStorage.setItem(key, JSON.stringify(fallback));
    }
  });

  const streakRaw = localStorage.getItem('wte_streak');
  if (streakRaw !== null) {
    const streak = Number(streakRaw);
    if (!Number.isFinite(streak) || streak < 0) {
      localStorage.setItem('wte_streak', '1');
    }
  }

  // The May 2026 cache-reset migration is complete. Mark it done before the
  // legacy app bundle loads so normal visits no longer unregister workers,
  // delete caches, or redirect through the old pwaReset URL.
  localStorage.setItem('whattoeat_pwa_reset_20260518_done', 'yes');
  sessionStorage.removeItem('whattoeat_pwa_reset_reload');

  document.addEventListener('DOMContentLoaded', () => {
    // Improve the highest-visibility catalog entries without rewriting the
    // legacy meal bundle. IDs/names/tags stay stable so Saved and history data
    // continue to point at the same meals.
    if (typeof meals !== 'undefined' && Array.isArray(meals)) {
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
        'Cajun Chicken Pasta': {
          desc: 'Creamy pasta with Cajun-spiced chicken and enough heat to keep the comfort from getting sleepy.',
          why: 'You still get creamy pasta comfort, but Cajun seasoning keeps the whole plate from playing it safe.',
          steps: ['Season chicken with Cajun seasoning and cook until browned and done.', 'Boil pasta and reserve a little pasta water.', 'Make a quick cream sauce in the chicken pan and stir in Parmesan if available.', 'Toss in the pasta, slice the chicken over top, and adjust seasoning.']
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

      const placeholderStepSets = [
        ['Gather the main ingredient', 'Heat it up or cook it through', 'Add sauce or seasoning', 'Plate it like you meant it'],
        ['Use what you have', 'Warm it up', 'Add flavor aggressively', 'Eat before overthinking it'],
        ['Start with the base', 'Add protein or toppings', 'Make it saucy', 'Finish with crunch or heat']
      ];

      const hasPlaceholderSteps = meal => {
        if (!Array.isArray(meal.steps) || meal.steps.length !== 4) return false;
        return placeholderStepSets.some(set => set.every((step, index) => meal.steps[index] === step));
      };

      const contextualSteps = meal => {
        const name = String(meal.name || '').toLowerCase();
        const category = String(meal.category || '').toLowerCase();

        if (/(pasta|alfredo|spaghetti|mac|noodle)/.test(name)) {
          return ['Boil the pasta or noodles until just tender, then drain.', 'Cook or warm the protein and vegetables you are using.', 'Add the sauce and seasoning, loosening with a splash of pasta water if needed.', 'Toss everything together and finish with cheese, herbs, or pepper.'];
        }
        if (/(taco|quesadilla|nacho|burrito|wrap)/.test(name)) {
          return ['Cook or warm the filling and season it well.', 'Warm the tortilla, chips, or wrap so it is ready to build.', 'Add cheese, vegetables, sauce, and the cooked filling.', 'Fold, toast, or pile it up, then finish with salsa, lime, or hot sauce.'];
        }
        if (/(rice|bowl)/.test(name)) {
          return ['Cook or reheat the rice or other bowl base.', 'Cook and season the main protein or vegetables.', 'Add the sauce or seasoning while everything is hot.', 'Build the bowl and finish with something fresh, crunchy, or spicy.'];
        }
        if (/(sandwich|burger|melt|toast|biscuit)/.test(name)) {
          return ['Prepare and season the filling or protein.', 'Toast or warm the bread until the edges have some color.', 'Layer the filling with cheese, sauce, and any toppings you want.', 'Close it up, slice if needed, and serve while everything is hot.'];
        }
        if (/(soup|stew|chili)/.test(name)) {
          return ['Cook the aromatics or vegetables until they start to soften.', 'Add the main ingredients plus broth, tomatoes, or your preferred liquid.', 'Simmer until everything is tender and the flavors come together.', 'Taste, adjust the seasoning, and finish with your favorite toppings.'];
        }
        if (/(egg|omelet|breakfast|pancake|waffle)/.test(name) || category.includes('breakfast')) {
          return ['Get the main breakfast ingredients ready and heat your pan or appliance.', 'Cook the eggs, batter, or protein until done to your liking.', 'Add cheese, seasoning, fruit, syrup, or toppings while everything is warm.', 'Plate it immediately and serve before breakfast turns into lunch.'];
        }
        if (/(chicken|salmon|fish|shrimp|steak|pork|meatloaf|turkey)/.test(name)) {
          return ['Season the main protein on all sides.', 'Cook it by skillet, oven, grill, or air fryer until safely cooked through.', 'Add or brush on the sauce during the final part of cooking.', 'Let it rest briefly, then serve with the easiest side that fits the plate.'];
        }
        return null;
      };

      meals.forEach(meal => {
        const patch = curated[meal.name];
        if (patch) Object.assign(meal, patch);

        if (!patch && hasPlaceholderSteps(meal)) {
          const betterSteps = contextualSteps(meal);
          if (betterSteps) meal.steps = betterSteps;
        }

        if (typeof meal.why === 'string' && meal.why.startsWith('This variation keeps')) {
          const mood = Array.isArray(meal.mood) ? meal.mood[0] : meal.mood;
          const budget = meal.budget === 'cheap' ? 'budget-friendly' : meal.budget === 'treat' ? 'treat-yourself' : 'normal-budget';
          const effort = meal.energy === 'low' ? 'low-effort' : meal.energy === 'high' ? 'higher-effort' : 'middle-effort';
          meal.why = `${meal.name} keeps the ${mood || 'food'} vibe, stays ${budget}, and fits a ${effort} night in about ${meal.time}.`;
        }
      });
    }

    // Reconcile persisted meal references after the main bundle has loaded.
    // This protects Saved/Profile if a future catalog update removes a meal.
    if (typeof meals !== 'undefined' && typeof state !== 'undefined' && Array.isArray(meals)) {
      const validMealIds = new Set(meals.map(meal => meal.id));
      const cleanedSaved = [...new Set(state.saved.filter(id => validMealIds.has(id)))];
      const cleanedHistory = state.history
        .filter(item => item && typeof item === 'object' && validMealIds.has(item.id))
        .slice(0, 20);

      if (cleanedSaved.length !== state.saved.length) {
        state.saved = cleanedSaved;
        localStorage.setItem('wte_saved', JSON.stringify(cleanedSaved));
      }

      if (cleanedHistory.length !== state.history.length) {
        state.history = cleanedHistory;
        localStorage.setItem('wte_history', JSON.stringify(cleanedHistory));
      }
    }

    // Smart Pick and Chaos Pick both render into the same result container.
    // The picker questionnaire is tall enough on mobile that a freshly
    // rendered recommendation can land below the viewport. Follow every
    // meaningful result mutation so the food WhatToEat chose becomes the
    // immediate focus after Pick, Reroll, or Chaos without changing picker
    // logic or recommendation scoring.
    const smartResult = document.getElementById('smartResult');
    if (smartResult) {
      let resultScrollFrame = 0;
      const scrollToRenderedResult = () => {
        if (smartResult.hidden || !smartResult.textContent?.trim()) return;
        window.cancelAnimationFrame(resultScrollFrame);
        resultScrollFrame = window.requestAnimationFrame(() => {
          smartResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      };

      const resultObserver = new MutationObserver(scrollToRenderedResult);
      resultObserver.observe(smartResult, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['hidden', 'class']
      });
    }

    const backdrop = document.getElementById('modalBackdrop');
    const modal = backdrop?.querySelector('.modal-card');
    const closeButton = document.getElementById('closeModal');
    if (!backdrop || !modal || !closeButton) return;

    let previouslyFocused = null;

    const focusableSelector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const isOpen = () => !backdrop.hidden && !backdrop.hasAttribute('hidden');

    const closeModalAccessibly = () => {
      closeButton.click();
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };

    const observer = new MutationObserver(() => {
      if (isOpen()) {
        if (document.activeElement && !modal.contains(document.activeElement)) {
          previouslyFocused = document.activeElement;
        }
        window.requestAnimationFrame(() => closeButton.focus());
      }
    });

    observer.observe(backdrop, { attributes: true, attributeFilter: ['hidden'] });

    document.addEventListener('keydown', event => {
      if (!isOpen()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeModalAccessibly();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = [...modal.querySelectorAll(focusableSelector)]
        .filter(element => element instanceof HTMLElement && !element.hidden);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });
})();
