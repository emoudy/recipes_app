
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { getValidatedSession } from "@/lib/auth/auth";

export async function GET(req: Request) {
  try {
    const session = await getValidatedSession(req);
    // If there is no session, getValidatedSession(req) returns a NextResponse with a 401 error
    if (session instanceof NextResponse) return session;

    const userId = Number(session.user.id);

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: { name: true,  email: true  }
    });

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
