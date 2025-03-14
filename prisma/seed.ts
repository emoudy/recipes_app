import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { id: 1, name: "Alice", email: "alice@example.com", password: "hashed_password" },
      { id: 2, name: "Bob", email: "bob@example.com", password: "hashed_password" },
      { id: 3, name: "Charlie", email: "charlie@example.com", password: "hashed_password" },
    ],
    skipDuplicates: true,
  });

  // Seed Recipes
  const recipes = await prisma.recipe.createMany({
    data: [
      {
        id: 1,
        name: "Egg Sandwich",
        category: "breakfast",
        description: "A simple and delicious breakfast sandwich.",
        servings: 1,
        prep_time: 10,
        cook_time: 5,
        created_at: new Date(),
        updated_at: new Date(),
        last_viewed: new Date(),
      },
      {
        id: 2,
        name: "Avocado Toast",
        category: "breakfast",
        description: "A quick and healthy avocado toast recipe.",
        servings: 1,
        prep_time: 5,
        cook_time: 0,
        created_at: new Date(),
        updated_at: new Date(),
        last_viewed: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  // Seed Ingredients
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { id: 1, name: "Egg" },
      { id: 2, name: "Bread" },
      { id: 3, name: "Butter" },
      { id: 4, name: "Avocado" },
      { id: 5, name: "Salt" },
    ],
    skipDuplicates: true,
  });

  // Seed RecipeIngredient (many-to-many relationship)
  const recipeIngredients = await prisma.recipeIngredient.createMany({
    data: [
      { recipe_id: 1, ingredient_id: 1, quantity: 2, unit: "pcs" },
      { recipe_id: 1, ingredient_id: 2, quantity: 2, unit: "slices" },
      { recipe_id: 1, ingredient_id: 3, quantity: 1, unit: "tbsp" },
      { recipe_id: 2, ingredient_id: 4, quantity: 1, unit: "pcs" },
      { recipe_id: 2, ingredient_id: 5, quantity: 1, unit: "pinch" },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
