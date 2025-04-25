import { auth } from "../../../../auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized - No valid session" }, { status: 401 });
  }

  return NextResponse.json({ message: "Session found",
    user: {
      id: session.user.id,
      email: session.user.email,
    },
  });
}
