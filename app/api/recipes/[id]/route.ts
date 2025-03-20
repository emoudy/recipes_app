
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { getValidatedSession } from "@/lib/auth/authFunctions";

export async function PATCH(req: Request) {
    try {
    const session = await getValidatedSession();
    // If there is no session, getValidatedSession(req) returns a NextResponse with a 401 error
    if (session instanceof NextResponse) return session;
      
      const { searchParams } = new URL(req.url);
      const recipeId = Number(searchParams.get("id"));
  
      // ✅ Parse the request body
      const { name, category, description, servings, prepTime, cookTime } = await req.json();
  
      // ✅ Ensure at least one field is being updated
      if (!name && !category && !description && !servings && !prepTime && !cookTime) {
        return NextResponse.json({ error: "No update fields provided" }, { status: 400 });
      }
  
      // ✅ Update the recipe
      const updatedRecipe = await db.recipe.update({
        where: { id: recipeId },
        data: {
          name,
          category,
          description,
          servings,
          prep_time: prepTime,
          cook_time: cookTime,
        },
      });
  
      return NextResponse.json(updatedRecipe, { status: 200 });
  
    } catch (error) {
      console.error("Error updating recipe:", error);
      return NextResponse.json({ error: "Error updating recipe" }, { status: 500 });
    }
  }

  export async function GET(req: Request) {
    try {
      const session = await getValidatedSession();
      // If there is no session, getValidatedSession(req) returns a NextResponse with a 401 error
      if (session instanceof NextResponse) return session;
  
      const { searchParams } = new URL(req.url);
      const recipeId = Number(searchParams.get("id"));
  
      const userId = session.user.id;
  
      // Fetch paginated recipes
      const recipe = await db.recipe.findFirst({
        where: {
          id: recipeId,
        },
        include: {
          recipeIngredients: {
            include: { ingredient: true },
          },
        },
      });
  
      return NextResponse.json(
        { recipe },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return NextResponse.json({ error: "Error fetching recipe" }, { status: 500 });
    }
  }