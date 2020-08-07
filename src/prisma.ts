import { PrismaClient } from "@prisma/client";
import pg from "railway/pg";
import dirTree from "directory-tree";

console.log("PWD", process.cwd());
console.log("CONFIG", pg.config);

const tree = dirTree(".");
console.log(tree);

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: pg.config.url,
    },
  },
});
