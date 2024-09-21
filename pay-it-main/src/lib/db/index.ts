import { PrismaClient } from "@prisma/client";

declare global {
  // biome-ignore lint/style/noVar: <explanation>
  var db: PrismaClient | undefined;
}

// biome-ignore lint/suspicious/noRedeclare: <explanation>
export const db = global.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.db = db;
