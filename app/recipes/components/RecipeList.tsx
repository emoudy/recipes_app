"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { categories } from "@/lib/variables";
import Link from "next/link";
import { RecipeInterface } from "@/lib/types";
import { useRecipes } from "@/recipes/hooks/useRecipes";
import ButtonStyled from "@/components/elements/ButtonStyled";

// Fetcher function for SWR
// TODO: get the data
// const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RecipeList() {
  const searchParams = useSearchParams();
	const router = useRouter();
  const { recipes, page, filter, error, isLoading } = useRecipes();

  const [visitedRecipes, setVisitedRecipes] = useState<string[]>([]);

  // Function to update filter in URL (Triggers new fetch)
  const updateFilter = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    params.set("page", "1"); // Reset to first page when changing filter
    router.replace(`?${params.toString()}`);
  };

  // Function to update pagination in URL (Triggers new fetch)
  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
  };

  // Track visited recipes in localStorage
  const handleRecipeClick = (recipeUrl: string) => {
    const updatedVisited = [...new Set([...visitedRecipes, recipeUrl])]; // Avoid duplicates
    setVisitedRecipes(updatedVisited);
    localStorage.setItem("visitedRecipes", JSON.stringify(updatedVisited));
  };

  // Load visited recipes from localStorage on first render
  useEffect(() => {
    const storedVisited = JSON.parse(localStorage.getItem("visitedRecipes") || "[]");
    setVisitedRecipes(storedVisited);
  }, []);

  console.log("Hello Recipes");
  return (
    <div className="p-4">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        {categories.map(category =>
            <ButtonStyled key={category} type="secondary" onClick={() => updateFilter(category)} title={category} />
        )}
      </div>

      {/* Loading & Error States */}
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Failed to load recipes</p>}

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes?.map((recipe: RecipeInterface) => {
          const recipeUrl = `/recipes/${recipe.id}`;
          return (
            <div key={recipe.id} className="relative p-4 bg-gray-800 text-white rounded">
              {/* Checkbox & Edit button - These stay OUTSIDE of the clickable link */}
              <div className="absolute top-2 left-2">
                <input type="checkbox" className="mr-2" />
              </div>
              <div className="absolute top-2 right-2">
                <button className="text-blue-400">✏ Edit</button>
              </div>

              {/* Clickable Recipe Card */}
              <Link
                href={recipeUrl}
                onClick={() => handleRecipeClick(recipeUrl)}
                className={clsx(
                  "block p-4 rounded-md hover:bg-gray-700 transition",
                  { "bg-sky-100 text-blue-600": visitedRecipes.includes(recipeUrl) }
                )}
              >
                <h3 className="font-bold text-lg">{recipe.name}</h3>
                <p className="text-sm">{recipe.prepTime} min</p>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => updatePage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">Page {page}</span>
        <button
          onClick={() => updatePage(page + 1)}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}