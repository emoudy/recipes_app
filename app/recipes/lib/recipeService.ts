import { RecipeInterface } from "@/lib/variables/types";

const RecipeService = {
	fetchRecipes: async () => {
    const res = await fetch(`/api/recipes`, { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return res.json();
  },

	fetchRecipe: async ( id: number) => {
    const res = await fetch(`/api/recipes/${id}`, { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch recipe");
    return res.json();
  },
  
	saveRecipe: async (recipeData: RecipeInterface ) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    if (!res.ok) throw new Error("Failed to save recipe");
    return res.json();
  },

  deleteRecipes: async (recipeIds: number[]) => {
    const res = await fetch(`/api/recipes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeIds }),
    });
  
    if (!res.ok) throw new Error("Failed to delete recipes");
    return res.json();
  },
};

export default RecipeService;