import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyPassword } from "@/lib/data";
import { db } from "./prisma/db";

export const authOptions: AuthOptions = {
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

        // ✅ Find user by email in the database
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        // ✅ Check if password is correct
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          return null;
        }

        // ✅ Convert `id` to a string because NextAuth requires `id` to be a string
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, any>).id = token.sub!;
      }
      return session;
    },
  },  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };