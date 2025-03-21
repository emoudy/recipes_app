import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("recipe-next-auth.session-token");

  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized - Missing session cookie" }, { status: 401 });
  }

  return NextResponse.json({ message: "Session found", cookie: sessionCookie });
}
