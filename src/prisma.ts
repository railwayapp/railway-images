import { PrismaClient } from "@prisma/client";
import pg from "railway/pg";

const { user, password, host, port, database } = pg.config;
const url = `postgresql://${user}:${password}@${host}:${port}/${database}`;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url,
    },
  },
});
