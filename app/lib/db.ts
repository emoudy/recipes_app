import { PrismaClient } from "@prisma/client";
// TODO: pnpm prisma migrate dev --name init

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;


const prisma = new PrismaClient();
export default prisma;
