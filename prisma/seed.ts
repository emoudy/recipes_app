import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Users
  await prisma.user.createMany({
    data: [
      { id: 1, name: "Alice", email: "alice@example.com", password: "hashed_password" },
      { id: 2, name: "Bob", email: "bob@example.com", password: "hashed_password" },
      { id: 3, name: "Charlie", email: "charlie@example.com", password: "hashed_password" },
    ],
    skipDuplicates: true,
  });

  // Seed Recipes
  await prisma.recipe.createMany({
    data: [
      {
        id: 1,
        name: "Egg Sandwich",
        category: "breakfast",
        description: "A simple and delicious breakfast sandwich.",
        servings: 1,
        prep_time: 10,
        cook_time: 5,
        created_at: new Date("2021-12-15"),
        updated_at: new Date("2021-12-15"),
        last_viewed: new Date("2021-12-18"),
      },
      {
        id: 2,
        name: "Avocado Toast",
        category: "breakfast",
        description: "A quick and healthy avocado toast recipe.",
        servings: 1,
        prep_time: 5,
        cook_time: 0,
        created_at: new Date("2023-12-15"),
        updated_at: new Date("2023-12-15"),
        last_viewed: new Date("2023-12-18"),
      },
      {
        id: 3,
        name: "Banana Smoothie",
        category: "drink",
        description: "A refreshing banana smoothie.",
        servings: 1,
        prep_time: 5,
        cook_time: 0,
        created_at: new Date("2022-12-15"),
        updated_at: new Date("2022-12-15"),
        last_viewed: new Date("2022-12-18"),
      },
    ],
    skipDuplicates: true,
  });

  // Seed Ingredients
  await prisma.ingredient.createMany({
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
  await prisma.recipeIngredient.createMany({
    data: [
      { recipe_id: 1, ingredient_id: 1, quantity: 2, unit: "pcs" },
      { recipe_id: 1, ingredient_id: 2, quantity: 2, unit: "slices" },
      { recipe_id: 1, ingredient_id: 3, quantity: 1, unit: "tbsp" },
      { recipe_id: 2, ingredient_id: 4, quantity: 1, unit: "pcs" },
      { recipe_id: 2, ingredient_id: 5, quantity: 1, unit: "pinch" },
    ],
    skipDuplicates: true,
  });

  // Seed UserRecipes (many-to-many relationship between Users and Recipes)
  await prisma.userRecipe.createMany({
    data: [
      { user_id: 1, recipe_id: 1 },
      { user_id: 1, recipe_id: 2 },
      { user_id: 1, recipe_id: 3 },
      { user_id: 2, recipe_id: 2 },
      { user_id: 2, recipe_id: 3 },
      { user_id: 3, recipe_id: 3 },
    ],
    skipDuplicates: true,
  });

  // Seed ChatSessions
  await prisma.chatSession.createMany({
    data: [
      { id: 1, name: "Breakfast Recipes", user_id: 1, created_at: new Date("2022-12-06T12:00:00Z"), updated_at: new Date("2022-12-06T12:00:00Z") },
      { id: 2, name: "Healthy Meals", user_id: 2, created_at: new Date("2022-12-07T10:00:00Z"), updated_at: new Date("2022-12-07T10:05:00Z") },
      { id: 3, name: "Quick Breakfast Ideas", user_id: 3, created_at: new Date("2022-12-08T08:00:00Z"), updated_at: new Date("2022-12-08T08:10:00Z") },
    ],
    skipDuplicates: true,
  });

  // Seed Messages (inside ChatSessions)
  await prisma.message.createMany({
    data: [
      { id: 1, chat_session_id: 1, user_query: "Hello, how are you?", timestamp: new Date("2022-12-06T12:00:00Z"), ai_response: "Doing well, thanks. How about you?" },
      { id: 2, chat_session_id: 1, user_query: "I am planning to make an egg sandwich for breakfast. Do you have a recipe?", timestamp: new Date("2022-12-06T12:02:00Z"), ai_response: "Sure! Here is a simple recipe for an egg sandwich..." },
      { id: 3, chat_session_id: 2, user_query: "What's a healthy meal for lunch?", timestamp: new Date("2022-12-07T10:00:00Z"), ai_response: "How about a fresh chicken salad? Would you like a recipe?" },
      { id: 4, chat_session_id: 3, user_query: "I need a quick breakfast idea. Any suggestions?", timestamp: new Date("2022-12-08T08:00:00Z"), ai_response: "Pancakes are a great option! Here's a recipe for fluffy pancakes..." },
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
