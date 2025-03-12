import bcrypt from "bcrypt";
import postgres from "postgres";
import { messages, chatSessions, recipes, userRecipes, users } from "@/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

//run the script:
// pnpm tsx prisma/seed.ts or pnpm prisma db seed

// Make sure your .env file has the correct PostgreSQL connection URL:
// POSTGRES_URL="postgresql://your_user:your_password@localhost:5432/mydb"

// Run the script:
// pnpm tsx prisma/seed.ts or pnpm prisma db seed

/** Test the script */
async function testConnection() {
  const result = await sql`SELECT 1`;
  console.log(result);
}

testConnection();


/** 🔹 Seed Users */
async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash("password123", 10); // Default password
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  console.log("✅ Users seeded");
  return insertedUsers;
}

/** 🔹 Seed Chat Sessions */
async function seedChatSessions() {
  await sql`
    CREATE TABLE IF NOT EXISTS chat_sessions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedChatSessions = await Promise.all(
    chatSessions.map(async (session) => {
      return sql`
        INSERT INTO chat_sessions (id, name, user_id, created_at, updated_at)
        VALUES (${session.id}, ${session.name}, ${session.userId}, ${session.createdAt}, ${session.updatedAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  console.log("✅ Chat Sessions seeded");
  return insertedChatSessions;
}

/** 🔹 Seed Messages */
async function seedMessages() {
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      chat_session_id INT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
      user_input TEXT NOT NULL,
      ai_output TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedMessages = await Promise.all(
    messages.map(async (message) => {
      return sql`
        INSERT INTO messages (id, chat_session_id, user_input, ai_output, timestamp)
        VALUES (${message.id}, ${message.chatSessionId}, ${message.userInput}, ${message.aiOutput}, ${message.timestamp})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  console.log("✅ Messages seeded");
  return insertedMessages;
}

/** 🔹 Seed Recipes */
async function seedRecipes() {
  await sql`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      servings INT NOT NULL,
      prep_time INT NOT NULL,
      cook_time INT NOT NULL,
      created_at DATE NOT NULL DEFAULT NOW(),
      updated_at DATE NOT NULL DEFAULT NOW(),
      last_viewed DATE NOT NULL DEFAULT NOW()
    );
  `;

  const insertedRecipes = await Promise.all(
    recipes.map(async (recipe) => {
      return sql`
        INSERT INTO recipes (id, name, category, description, servings, prep_time, cook_time, created_at, updated_at, last_viewed)
        VALUES (${recipe.id}, ${recipe.name}, ${recipe.category}, ${recipe.description}, ${recipe.servings}, ${recipe.prepTime}, ${recipe.cookTime}, ${recipe.createdAt}, ${recipe.updatedAt}, ${recipe.lastViewed})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  console.log("✅ Recipes seeded");
  return insertedRecipes;
}

/** 🔹 Seed User Recipes (Mapping Users to Saved Recipes) */
async function seedUserRecipes() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_recipes (
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      recipe_id INT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
      saved_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (user_id, recipe_id)
    );
  `;

  const insertedUserRecipes = await Promise.all(
    userRecipes.map(async (entry) => {
      return sql`
        INSERT INTO user_recipes (user_id, recipe_id, saved_at)
        VALUES (${entry.userId}, ${entry.recipeId}, ${entry.savedAt})
        ON CONFLICT (user_id, recipe_id) DO NOTHING;
      `;
    })
  );

  console.log("✅ User Recipes seeded");
  return insertedUserRecipes;
}

/** 🔹 Run the Seeding Process */
async function main() {
  try {
    console.log("🌱 Seeding Database...");
    await seedUsers();
    await seedChatSessions();
    await seedMessages();
    await seedRecipes();
    await seedUserRecipes();
    console.log("✅ Database successfully seeded!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await sql.end();
  }
}

main();