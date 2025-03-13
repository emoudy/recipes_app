
import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const recipeId = Number(params.id);

    if (isNaN(recipeId)) {
      return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
    }

    // ✅ Delete the recipe and related userRecipe entries in a transaction
    await db.$transaction([
      db.userRecipe.deleteMany({ where: { recipe_id: recipeId } }), // Remove associations
      db.recipe.delete({ where: { id: recipeId } }), // Remove the recipe
    ]);

    return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json({ error: "Error deleting recipe" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: number } }) {
    try {
      const recipeId = params.id;
  
      if (isNaN(recipeId)) {
        return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
      }
  
      // ✅ Parse the request body
      const { name, category, description, servings, prepTime, cookTime, lastViewed } = await req.json();
  
      // ✅ Ensure at least one field is being updated
      if (!name && !category && !description && !servings && !prepTime && !cookTime && !lastViewed) {
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
          last_viewed: lastViewed ? new Date(lastViewed) : undefined,
          updated_at: new Date(), // ✅ Automatically update timestamp
        },
      });
  
      return NextResponse.json(updatedRecipe, { status: 200 });
  
    } catch (error) {
      console.error("Error updating recipe:", error);
      return NextResponse.json({ error: "Error updating recipe" }, { status: 500 });
    }
  }