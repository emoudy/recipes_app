
import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";

export async function GET(req: Request, { params }: { params: { chatSessionId: number } }) {
  try {
    const chatSessionId = params.chatSessionId;

    if (isNaN(chatSessionId)) {
      return NextResponse.json({ error: "Invalid chat session ID" }, { status: 400 });
    }

    const messages = await db.message.findMany({
      where: { chat_session_id: chatSessionId },
      select: {
        id: true,
        user_query: true,
        ai_response: true,
        message_timestamp: true,
      },
      orderBy: { message_timestamp: "asc" }, // Sort by oldest messages first
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
