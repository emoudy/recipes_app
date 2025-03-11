import bcrypt from "bcrypt";
import { db } from "@lib/db";

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await hashPassword(password);
  return await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
}

export async function createChatSession(userId: string, chatSessionName: string) {
  return await db.chatSession.create({
    data: { userId, name: chatSessionName },
  });
}

export async function createRecipe(userId: string, recipeData: any) {
  return await db.recipe.create({
    data: { ...recipeData, userId },
  });
}


export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true, password: true },
  });
}

export async function getUserChatSessions(userId: string) {
  return await db.chatSession.findMany({
    where: { userId },
    select: { id: true, name: true, createdAt: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getUserRecipes(userId: string) {
  return await db.recipe.findMany({
    where: { userId },
    select: { id: true, name: true, category: true, prepTime: true },
    orderBy: { createdAt: "desc" },
  });
}