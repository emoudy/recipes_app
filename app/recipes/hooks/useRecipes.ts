"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RecipeService from "@/recipes/lib/recipeService";
import { RecipeApiResponseInterface } from "@/lib/variables/types";

export function useRecipes() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  // Use Infinite Query for Pagination
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    RecipeApiResponseInterface,
    Error,
    RecipeApiResponseInterface,
    [string, string],
    number
  >({
    queryKey: ["recipes", category], 
    queryFn: () => RecipeService.fetchRecipes(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasNextPage ? allPages.length + 1 : undefined), 
    staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes
  });

  return {
    recipes: data,
    hasNextPage,
    fetchNextPage,
    error,
    isLoading,
    filter: category,
  };
}
