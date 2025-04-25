"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RecipeApiResponseInterface, RecipeInterface } from "@/lib/variables/interfaces";
import RecipeService from "../recipeService";

export function useRecipes(category: string, page: number) {
  const { data, error, isError, isLoading, refetch} = useQuery<RecipeApiResponseInterface>({
    queryKey: ["recipes", category, page], // Unique key for caching
    queryFn: RecipeService.fetchRecipes,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return {
    recipes: data?.recipes,
    totalRecipes: data?.totalRecipes,
    hasNextPage: data?.hasNextPage,
    refetch,
    currentPage: page,
    error,
    isError,
    isLoading,
    category,
  }
}

export function useRecipe(id: number) {
  const { data, error, isError, isLoading, refetch} = useQuery<RecipeInterface>({
    queryKey: ["recipe", id], // Unique key for caching
    queryFn: () => RecipeService.fetchRecipe(id),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return {
    recipe: data,
    refetch,
    error,
    isError,
    isLoading,
  }
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (recipeData: RecipeInterface) => RecipeService.updateRecipe(recipeData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }),
  })
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (recipeData: RecipeInterface) => RecipeService.createRecipe(recipeData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }),
  })
}

export function useDeleteRecipes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ids: number[]) => RecipeService.deleteRecipes(ids),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["recipes"] }),
  })
}