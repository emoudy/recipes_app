/*
  Warnings:

  - You are about to drop the column `timestamp` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "timestamp",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "ChatSession_user_id_idx" ON "ChatSession"("user_id");

-- CreateIndex
CREATE INDEX "Message_chat_session_id_idx" ON "Message"("chat_session_id");

-- CreateIndex
CREATE INDEX "Recipe_category_idx" ON "Recipe"("category");

-- CreateIndex
CREATE INDEX "RecipeIngredient_recipe_id_idx" ON "RecipeIngredient"("recipe_id");

-- CreateIndex
CREATE INDEX "RecipeIngredient_ingredient_id_idx" ON "RecipeIngredient"("ingredient_id");

-- CreateIndex
CREATE INDEX "UserRecipe_user_id_idx" ON "UserRecipe"("user_id");

-- CreateIndex
CREATE INDEX "UserRecipe_recipe_id_idx" ON "UserRecipe"("recipe_id");
