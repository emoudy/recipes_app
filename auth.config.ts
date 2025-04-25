import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { verifyPassword } from "./app/lib/auth/authFunctions";
import { db } from "@/app/lib/db/db";

export const authConfig = {
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
				email: { label: "Email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (
					!credentials ||
					typeof credentials.email !== 'string' ||
					typeof credentials.password !== 'string'
				) {
					return null;
				}
			
				console.log("credentials", credentials);
			
				const user = await db.user.findUnique({
					where: { email: credentials.email },
				});

				const hashedPassword = user?.password ?? '';
			
				const isValid = await verifyPassword(credentials.password, hashedPassword || "");
				if (!isValid) return null;
			
				if (!user) return null;

				return {
					id: Number(user.id),
					email: user.email,
					name: user.name,
				};
			}
		}),
	],
} satisfies NextAuthOptions;