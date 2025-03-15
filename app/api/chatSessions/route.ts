import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
import { db } from "@/lib/db/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized - Missing user ID" }, { status: 401 });
    }

    const userId = session.user.id;
    const chatSessions = await db.chatSession.findMany({ 
      where: { user_id: userId },
      orderBy: { updated_at: "desc" },
  });

    return NextResponse.json(chatSessions);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch chat sessions";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;
    const { chatSessionName } = await req.json();
    if (!chatSessionName) throw new Error("Chat session name is required");

    // TODO: Do we have to send the user_id?  Encrypt?  Can the backend use the session to get it?
    const newChatSession = await db.chatSession.create({
      data: { user_id: userId, name: chatSessionName },
    });

    return NextResponse.json(newChatSession, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create chat sessions";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
