import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { getCachedRecipeIds, setCachedRecipeIds, removeCachedRecipeIds } from "@/lib/cache";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    let page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10; // Default page size

    if (page < 1) page = 1; // Prevent invalid pages

    const userId = session.user.id;

    // Check shared cache before fetching from DB
    let recipeIds = getCachedRecipeIds();


    if (!recipeIds) {
      const userRecipes = await db.userRecipe.findMany({
        where: { user_id: userId },
        select: { recipe_id: true },
      });

      recipeIds = userRecipes.map((ur) => ur.recipe_id);
      setCachedRecipeIds(recipeIds); // ✅ Store in shared cache
    }

    if (recipeIds.length === 0) {
      return NextResponse.json({ recipes: [], total: 0, hasNextPage: false }, { status: 200 });
    }

    // Get total count (for pagination)
    const totalRecipes = await db.recipe.count({
      where: {
        id: { in: recipeIds },
        ...(category ? { category } : {}), // Apply category filter if provided
      },
    });

    // Fetch paginated recipes
    const recipes = await db.recipe.findMany({
      where: {
        id: { in: recipeIds },
        ...(category ? { category } : {}), // Apply category filter only if provided
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { created_at: "desc" },
      include: {
        recipeIngredients: {
          include: { ingredient: true },
        },
      },
    });

    // Calculate if there is a next page
    const hasNextPage = page * pageSize < totalRecipes;

    return NextResponse.json(
      { recipes, total: totalRecipes, hasNextPage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Error fetching recipes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name, category, prepTime, cookTime, description, servings } = await req.json();
    const userId = session.user.id;

    // ✅ Create the recipe
    const newRecipe = await db.recipe.create({
      data: {
        name,
        category,
        description: description || "",
        servings: servings || 1,
        prep_time: prepTime || 0,
        cook_time: cookTime || 0,
      },
    });

    // ✅ Create the user-recipe relationship
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

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { recipeIds } = await req.json(); // Expect an array of recipe IDs in the body

    if (!recipeIds || !Array.isArray(recipeIds) || recipeIds.length === 0) {
      return NextResponse.json({ error: "Recipe IDs are required" }, { status: 400 });
    }

    const deleteRecipeIds = recipeIds.map(recipe => recipe.id);

    // Delete recipes in the userRecipe table
      await db.userRecipe.deleteMany({
      where: { recipe_id: { in: deleteRecipeIds } },
    });
    
    // Delete recipes in the recipe table
    await db.recipe.deleteMany({
      where: { id: { in: deleteRecipeIds } },
    });

    // Remove only the deleted recipes from cache
    removeCachedRecipeIds(deleteRecipeIds);

    // console.log(`Deleted recipes: ${deleteRecipeIds.join(", ")} and updated cache`);

    return NextResponse.json({ message: "Deleted recipes successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recipes:", error);
    return NextResponse.json({ error: "Error deleting recipes" }, { status: 500 });
  }
}