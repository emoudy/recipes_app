import bcrypt from "bcryptjs";
import { db } from "@/lib/db/db";

/** 🔹 Hashes a user's password */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/** 🔹 Verifies a user's password */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/** 🔹 Creates a new user */
export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: {
      email,
      name,
      password: hashedPassword, // ✅ Secure password storage
    },
  });
}

/** 🔹 Creates a new chat session */
export async function createChatSession(userId: number, name: string) {
  return db.chatSession.create({
    data: { user_id: userId, name },
  });
}

/** 🔹 Saves a recipe for a user (links user to an existing recipe) */
export async function saveUserRecipe(userId: number, recipeId: number) {
  return db.userRecipe.create({
    data: { user_id: userId, recipe_id: recipeId },
  });
}

/** 🔹 Creates a new recipe in the database */
export async function createRecipe(recipeData: {
  name: string;
  category: string;
  description: string;
  servings: number;
  prep_time: number;
  cook_time: number;
}): Promise<void> {
  await db.recipe.create({
    data: recipeData,
  });
}

/** 🔹 Fetches a user by email */
export async function getUserByEmail(email: string) {
  return db.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, password: true },
  });
}

/** 🔹 Fetches all chat sessions for a user */
export async function getUserChatSessions(userId: number) {
  return db.chatSession.findMany({
    where: { user_id: userId },
    select: { id: true, name: true, created_at: true, updated_at: true },
    orderBy: { updated_at: "desc" },
  });
}

/** 🔹 Fetches recipes saved by a specific user */
export async function getUserRecipes(userId: number) {
  return db.userRecipe.findMany({
    where: { user_id: userId },
    include: { 
      recipe: {
        select: {
          id: true,
          name: true,
          category: true,
          description: true,
          prep_time: true,
          servings: true,
          cook_time: true,
          created_at: true,
          updated_at: true,
          last_viewed: true,
        },
      },
    },
    orderBy: { recipe: { name: "asc" } }, // ✅ Sort recipes alphabetically
  });
}