const recipeIdCache = { recipeIds: [] as number[] }; // Single cache store

export function getCachedRecipeIds() {
  return recipeIdCache.recipeIds;
}

export function setCachedRecipeIds(recipeIds: number[]) {
  recipeIdCache.recipeIds = recipeIds;
}

export function removeCachedRecipeIds(recipeIdsToRemove: number[]) {
  if (recipeIdCache.recipeIds) {
    recipeIdCache.recipeIds = recipeIdCache.recipeIds.filter(id => !recipeIdsToRemove.includes(id));

    // ✅ If no recipes are left, clear the cache entirely
    if (recipeIdCache.recipeIds.length === 0) {
      clearCachedRecipeIds();
    }
  }
}

export function clearCachedRecipeIds() {
  recipeIdCache.recipeIds = [];
}

