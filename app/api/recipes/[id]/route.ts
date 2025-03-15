
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";

export async function PATCH(req: Request) {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
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