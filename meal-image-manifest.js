// WhatToEat exact meal-image manifest.
// Add only approved 1:1 production assets here as:
//   mealId: '/meal-images/<mealId>.webp'
//
// Acceptance rule: a mapping is not considered complete until the runtime
// health checker can load the referenced file successfully. Missing/corrupt
// mappings are automatically downgraded to safe fallback visuals and requeued
// by the image-production workflow.
//
// Keeping this separate from the renderer lets image batches land without
// rewriting meal-image resolution logic.
window.WTE_MEAL_IMAGES = Object.freeze({
  1: '/meal-images/1.webp',
  2: '/meal-images/2.webp',
  3: '/meal-images/3.webp',
  4: '/meal-images/4.webp',
  5: '/meal-images/5.webp',
  6: '/meal-images/6.webp',
  7: '/meal-images/7.webp',
  8: '/meal-images/8.webp',
  9: '/meal-images/9.webp',
  10: '/meal-images/10.webp',
  11: '/meal-images/11.webp',
  12: '/meal-images/12.webp',
  13: '/meal-images/13.webp',
  14: '/meal-images/14.webp',
  15: '/meal-images/15.webp',
  16: '/meal-images/16.webp',
  17: '/meal-images/17.webp',
  18: '/meal-images/18.webp',
  19: '/meal-images/19.webp',
  20: '/meal-images/20.webp',
  21: '/meal-images/21.webp',
  23: '/meal-images/23.webp',
  24: '/meal-images/24.webp',
  25: '/meal-images/25.webp',
});
