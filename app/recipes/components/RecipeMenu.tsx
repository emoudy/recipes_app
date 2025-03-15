"use client";
import { RecipeInterface } from "@/lib/variables/types";
import { useState } from "react";
import { useRecipes } from "../hooks/useRecipes";

export default function RecipeMenu() {
  const { recipes, mutate } = useRecipes();

  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRecipes(newSelectAll ? recipes.map(((recipe: RecipeInterface) => recipe.id)) : []);
  };
  

  // Handle individual selection
  const handleSelect = (recipeId: number) => {
    setSelectedRecipes(prev =>
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  // Handle Delete selected recipes
  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedRecipes.map(async (recipeId) => {
          const res = await fetch(`/api/recipes/${recipeId}`, { method: "DELETE" });
          if (!res.ok) throw new Error(`Failed to delete recipe ${recipeId}`);
        })
      );

      // Optimistically update the cache after deletion
      console.log("Recipes before mutate:", recipes);
      mutate(recipes.filter((recipe: RecipeInterface) => !selectedRecipes.includes(recipe.id)), false);

      // Reset selection state
      setSelectedRecipes([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting recipes:", error);
    }
  };

  console.log("Hello Menu");
  return (
    <div className="flex flex-col bg-gray-900 text-white p-4">
      {/* TODO: Error Handling */}
      {/* {error && <p className="text-red-500">Failed to load recipes.</p>} */}

      {/* Select All Checkbox */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            disabled={!recipes.length} // Disable if no recipes exist
          />
          Select All
        </label>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            disabled={selectedRecipes.length === 0}
            className="bg-red-600 px-4 py-2 rounded disabled:opacity-50"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
