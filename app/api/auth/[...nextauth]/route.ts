import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";

/*
This file is a catch-all route that handles multiple dynamic routes
/api/auth/signin
/api/auth/signout
/api/auth/session
/api/auth/callback/{provider}
*/

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };