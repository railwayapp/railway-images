import { PrismaClient } from "@prisma/client";
import pg from "railway/pg";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: pg.config.url,
    },
  },
});
