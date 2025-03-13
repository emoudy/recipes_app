
import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";

export async function GET(req: Request, { params }: { params: { userId: number } }) {
  try {
    const userId = params.userId;

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const chatSessions = await db.chatSession.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { updated_at: "desc" },
    });

    if (!chatSessions.length) {
      return NextResponse.json({ error: "No chat sessions found for this user" }, { status: 404 });
    }

    return NextResponse.json(chatSessions, { status: 200 });

  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json({ error: "Failed to fetch chat sessions" }, { status: 500 });
  }
}
