import bcrypt from "bcryptjs";
import { auth } from "../../../auth";
import { Session } from "next-auth";
import { UserInterface } from "../variables/interfaces";

declare module "next-auth" {
  interface Session {
    user: UserInterface
  }
}

/** Hashes a user's password */
// export async function hashPassword(password: string): Promise<string> {
//   const saltRounds = 10;
//   return bcrypt.hash(password, saltRounds);
// }

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getValidatedSession(): Promise<Session> {
  const session: Session | null = await auth();

  if (!session || !session.user?.id) {
    console.log("Not Working")
    throw new Error("Unauthorized - Missing user ID"); 
  }

  return session;
}