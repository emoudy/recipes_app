import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { getValidatedSession } from "@/lib/auth/authFunctions";

export async function GET(req: NextRequest) {
  try {
    const session = await getValidatedSession();
    
    // If there is no session, getValidatedSession(req) returns a NextResponse with a 401 error
    if (session instanceof NextResponse) return session;
    
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
    const session = await getValidatedSession();
    // If there is no session, getValidatedSession(req) returns a NextResponse with a 401 error
    if (session instanceof NextResponse) return session;

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
