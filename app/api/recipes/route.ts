import { NextResponse } from "next/server";
import { db } from "../../../prisma/db";
import { RecipeInterface } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { userId, name, category, prepTime, cookTime, description, servings } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // ✅ Create the recipe first
    const newRecipe = await db.recipe.create({
      data: {
        name,
        category,
        description,
        servings,
        prep_time: prepTime,
        cook_time: cookTime,
      },
    });

    // ✅ Then create the user-recipe relationship using the newRecipe.id
    const userRecipe = await db.userRecipe.create({
      data: {
        user_id: userId,
        recipe_id: newRecipe.id,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });

  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json({ error: "Error creating recipe" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10; // Set default page size

    // Fetch recipes with pagination
    const recipes = await db.recipe.findMany({
      where: category ? { category } : {},
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { created_at: "desc" },
      include: {
        recipeIngredients: {
          include: { ingredient: true }, // ✅ Fetch ingredient details
        },
      },
    });

    return NextResponse.json(
      recipes
      ,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error fetching recipes" }, { status: 500 });
  }
}