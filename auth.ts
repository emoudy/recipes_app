import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyPassword } from "@/lib/auth/authFunctions";
import { db } from "./app/lib/db/db";


interface User {
  id: number;
  name: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email in the database
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        // Check if password is correct
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        // Converting `id` to a string because NextAuth requires `id` to be a string
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: User }) {
      if (user) {
        token.id = user.id; // ✅ Store user ID in JWT
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (!session.user) {
        session.user = {} as any; // ✅ Ensure `session.user` exists
      }
      if (token?.id) {
        session.user.id = token.id as number; // ✅ Attach user ID to session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Required for NextAuth.js
  pages: {
    signIn: "/login", // Redirect users to custom login page
  },
  cookies: {
    sessionToken: {
      name: "recipe-next-auth.session-token", // ✅ Unique cookie name
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false, 
        path: "/",
        sameSite: "lax",
      },
    },
  }, 
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export { auth as middleware };
