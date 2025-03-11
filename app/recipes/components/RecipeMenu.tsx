"use client";
import { RecipeInterface } from "@/lib/interfaces";
import { useState } from "react";
import { useRecipes } from "../hooks/useRecipes";

export default function RecipeMenu() {
  const { recipes, page, filter, error, isLoading, mutate } = useRecipes();

  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Handle Select All toggle
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRecipes([]); // Deselect all
    } else {
      setSelectedRecipes(recipes.map((recipe: RecipeInterface) => recipe.recipeId)); // Select all
    }
    setSelectAll(!selectAll);
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
      mutate(recipes.filter((recipe: RecipeInterface) => !selectedRecipes.includes(Number(recipe.recipeId))), false);

      // Reset selection state
      setSelectedRecipes([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting recipes:", error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white p-4">
      {/* Error Handling */}
      {error && <p className="text-red-500">Failed to load recipes.</p>}

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

      {/* Recipe List with Checkboxes */}
      <ul className="mt-4">
        {recipes.map((recipe: RecipeInterface) => (
          <li key={recipe.recipeId} className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              checked={selectedRecipes.includes(Number(recipe.recipeId))}
              onChange={() => handleSelect(Number(recipe.recipeId))}
            />
            {recipe.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
