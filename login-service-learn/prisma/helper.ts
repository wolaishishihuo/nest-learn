import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const helper = async <T>(
  callback: (prisma: PrismaClient, index: number) => Promise<T>,
  num: number = 10,
) => {
  for (let i = 0; i < num; i++) {
    await callback(prisma, i);
  }
};
