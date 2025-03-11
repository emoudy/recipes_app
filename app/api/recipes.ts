import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]";
import { db } from "@lib/db";
import prisma from "@lib/db"; // Import Prisma Client


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
  
      const userId = session.user.id; // Ensure this is correctly retrieved
      const recipeData = await req.json();
  
      if (!recipeData.name || !recipeData.category || !recipeData.prepTime) {
        return NextResponse.json({ error: "Missing required recipe fields" }, { status: 400 });
      }
  
      // Create new recipe with Prisma
      const newRecipe = await prisma.recipe.create({
        data: {
          name: recipeData.name,
          category: recipeData.category,
          prepTime: recipeData.prepTime,
          userId,
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
    return NextResponse.json({ error: error.message || "Failed to delete recipe" }, { status: 500 });
  }
}