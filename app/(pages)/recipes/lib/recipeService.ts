import { RecipeInterface } from "@/lib/variables/interfaces";

const RecipeService = {
  /** Fetches ALL recipes */
	fetchRecipes: async () => {
    const res = await fetch(`/api/recipes`, { method: "GET", credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch recipes");
    const { data } = await res.json();
    return {
      recipes: data.recipes,
      totalRecipes: data.total,
      hasNextPage: data.hasNextPage,
    };
  },

  /** Fetches one recipe */
	fetchRecipe: async ( id: number) => {
    const res = await fetch(`/api/recipes/${id}`, { method: "GET", credentials: "include", });
    if (!res.ok) throw new Error("Failed to fetch recipe");
    const { data } = await res.json(); 
    return data;
  },
  
  createRecipe: async (recipeData: RecipeInterface ) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    if (!res.ok) throw new Error("Failed to save recipe");
    const { data } = await res.json(); 
    return data;
  },
  
	updateRecipe: async (recipeData: RecipeInterface ) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    if (!res.ok) throw new Error("Failed to save recipe");
    const { data } = await res.json(); 
    return data;
  },

  deleteRecipes: async (recipeIds: number[]) => {
    const res = await fetch(`/api/recipes`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeIds }),
    });
  
    if (!res.ok) throw new Error("Failed to delete recipes");
    const { data } = await res.json(); 
    return data;
  },
};

export default RecipeService;