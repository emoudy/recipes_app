"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import RecipeService from "@/recipes/lib/recipeService";


export function useRecipes() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/recipes?category=${encodeURIComponent(category)}&page=${page}`,
    () => RecipeService.fetchRecipes()
  );

  return {
    recipes: data || [],
    error,
    isLoading,
    mutate, // Allows updates without refetching
    page,
    filter: category,
  };
}
