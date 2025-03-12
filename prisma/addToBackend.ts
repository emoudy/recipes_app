// Prisma does not delete Recipe automatically when all users who saved it are deleted.
// To fix this, you have two options:

// Option 1: Use Prisma Client to delete the recipe if no users reference it
// export async function deleteUserRecipe(userId: number, recipeId: number) {
//     await db.userRecipe.deleteMany({
//       where: { userId, recipeId },
//     });
  
//     // Check if the recipe is still referenced by any users
//     const remainingUsers = await db.userRecipe.count({
//       where: { recipeId },
//     });
  
//     if (remainingUsers === 0) {
//       await db.recipe.delete({
//         where: { id: recipeId },
//       });
//     }
//   }

// Option 2: Use a database trigger to delete the recipe if no users reference it
// CREATE OR REPLACE FUNCTION delete_unused_recipes()
// RETURNS TRIGGER AS $$
// BEGIN
//   DELETE FROM recipes
//   WHERE id NOT IN (SELECT recipe_id FROM user_recipes);
//   RETURN NULL;
// END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER trigger_delete_unused_recipes
// AFTER DELETE ON user_recipes
// FOR EACH ROW EXECUTE FUNCTION delete_unused_recipes();


  
