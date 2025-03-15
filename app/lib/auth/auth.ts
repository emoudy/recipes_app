import { getServerSession } from "next-auth";
import { authOptions } from "./auth.config";
import { NextResponse } from "next/server";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
    };
  }
}

export async function getValidatedSession(req: Request) {
  const session = await getServerSession(authOptions);

  // ✅ Centralized session validation
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized - Missing user ID" }, { status: 401 });
  }

  return session;
}
