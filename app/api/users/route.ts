import { NextResponse } from "next/server";
import prisma from "../../../prisma/db"; // Import Prisma Client

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
