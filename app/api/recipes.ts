import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "../../prisma/db";
import prisma from "../../prisma/db"; // Import Prisma Client
import { authOptions } from "../../auth.config";


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10; // Number of recipes per page

    const whereClause = category ? { category } : {};

    const recipes = await db.recipe.findMany({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const recipeData = await req.json();
  
      if (!recipeData.name || !recipeData.category || !recipeData.prepTime) {
        return NextResponse.json({ error: "Missing required recipe fields" }, { status: 400 });
      }
  
      // Create new recipe with Prisma
      const newRecipe = await prisma.recipe.create({
        data: {
          name: recipeData.name,
          category: recipeData.category,
          prep_time: recipeData.prepTime,
          description: recipeData.description || "",
          servings: recipeData.servings || 1,
          cook_time: recipeData.cookTime || 0,
        },
      });
  
      return NextResponse.json(newRecipe, { status: 201 });
    } catch (error) {
      console.error("Error creating recipe:", error);
      return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
    }
  }

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const { recipeId } = await req.json();
    if (!recipeId) throw new Error("Recipe ID is required");

    await db.recipe.delete({ where: { id: recipeId } });
    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete recipe";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}