import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
  
  return new PrismaClient({ adapter });
};

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;