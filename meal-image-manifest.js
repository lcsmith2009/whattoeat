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
  // 1: '/meal-images/1.webp',
});
