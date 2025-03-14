"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { recipes } from "@/lib/placeholder-data";


export function useRecipes() {
  const fetcher = (url: string) => 
    fetch(url).then(res => res.json())
      .then(data => 
        data.map((recipe: any) => ({
          ...recipe,
          createdAt: new Date(recipe.created_at),
          updatedAt: new Date(recipe.updated_at),
          lastViewed: new Date(recipe.last_viewed),
        }))
      );

  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/recipes?category=${encodeURIComponent(category)}&page=${page}`,
    fetcher
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
