import { helper } from '../helper';
import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
export default async () => {
  await helper(async (prisma: PrismaClient) => {
    return await prisma.permission.create({
      data: {
        name: Random.cname(),
        desc: Random.csentence(),
      },
    });
  });
};
