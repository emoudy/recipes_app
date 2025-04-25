import { type User, type Session, type SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./app/lib/db/db";
import { authConfig } from "./auth.config";

export const authOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    login: '/auth/login',
    logout: '/auth/logout',
    reset: '/auth/reset',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    signUp: '/auth/signup' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async signIn({ user, email }: { user: User; email?: { verificationRequest?: boolean } }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized';
      }
    },
    async session({ session, user, token }: { session: Session; user: User; token: JWT }) {
      if (!session.user) session.user = {} as any; // ✅ Ensure `session.user` exists
      if (token?.id) {
        session.user.id = token.id as number; // ✅ Attach user ID to session
      }
      return session;
    },
    async jwt({ token, user, profile, isNewUser }: { token: JWT; user: User; profile: any; isNewUser: boolean }) {
      if (user && user.id) {
        token.id = user.id; // ✅ Store user ID in JWT
      }
      return token
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  // events: {
  //   async login(message) { /* on successful sign in */ },
  //   async logout(message) { /* on signout */ },
  //   async createUser(message) { /* user created */ },
  //   async updateUser(message) { /* user updated - e.g. their email was verified */ },
  //   async session(message) { /* session is active */ },
  // }
  // secret: process.env.NEXTAUTH_SECRET, // Required for NextAuth.js s
  ...authConfig,
};
