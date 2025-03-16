
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const chatSessionId = Number(searchParams.get("id"));

    const messages = await db.message.findMany({
      where: { chat_session_id: chatSessionId },
      select: {
        id: true,
        user_query: true,
        ai_response: true,
        timestamp: true,
      },
      orderBy: { timestamp: "asc" }, // Sort by oldest messages first
    });

    if (!messages.length) {
      return NextResponse.json({ error: "No messages found for this chat session" }, { status: 404 });
    }

    return NextResponse.json(messages, { status: 200 });

  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
