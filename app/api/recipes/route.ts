import { NextResponse } from "next/server";
import prisma from "../../../prisma/db";

export async function POST(req: Request) {
  try {
    const { name, category, prepTime, userId } = await req.json();

    const newRecipe = await prisma.recipe.create({
      data: { name, category, prepTime, userId },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating recipe" }, { status: 500 });
  }
}
