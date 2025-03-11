import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    const userId = session.user.id;
    const chatSessions = await db.chatSession.findMany({ where: { userId } });
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

    const newChatSession = await db.chatSession.create({
      data: { userId, chatSessionName },
    });

    return NextResponse.json(newChatSession, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to create chat session" }, { status: 500 });
  }
}