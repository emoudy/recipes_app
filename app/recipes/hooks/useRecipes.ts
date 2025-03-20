"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import RecipeService from "@/recipes/lib/recipeService";
import { RecipeApiResponseInterface } from "@/lib/variables/interfaces";

export function useRecipes() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const currentPage = searchParams.get("page") || "";

  const { data, error, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    RecipeApiResponseInterface, // ✅ Matches new API structure
    Error
  >({
    queryKey: ["recipes", category], 
    queryFn: () => RecipeService.fetchRecipes(), // ✅ Fetch with pagination
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.hasNextPage ? currentPage + 1 : undefined, // ✅ Use correct pagination logic
    staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes
  });

  return {
    recipes: data?.pages.flatMap((page) => page.recipes) || [], // ✅ Flatten paginated data
    totalRecipes: data?.pages[0]?.total || 0, // ✅ Get total from first page
    hasNextPage, // ✅ Already managed by React Query
    fetchNextPage,
    currentPage,
    error,
    isLoading,
    filter: category,
  };
}
