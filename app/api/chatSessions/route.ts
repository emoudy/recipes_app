import { NextResponse } from "next/server";
import { db } from "../../../prisma/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const chatSessions = await db.chatSession.findMany({
      where: { user_id: parseInt(userId, 10) },
      select: { id: true, name: true, updated_at: true },
      orderBy: { updated_at: "desc" },
    });

    return NextResponse.json(chatSessions);
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json({ error: "Error fetching chat sessions" }, { status: 500 });
  }
}
