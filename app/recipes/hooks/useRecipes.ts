"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useRecipes() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || ""; // ✅ Auto-detect category
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
