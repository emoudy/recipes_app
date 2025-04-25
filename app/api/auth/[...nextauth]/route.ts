/*
This file is a catch-all route that handles multiple dynamic routes
/api/auth/signin
/api/auth/signout
/api/auth/session
/api/auth/callback/{provider}
*/
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";

export default NextAuth(authConfig);