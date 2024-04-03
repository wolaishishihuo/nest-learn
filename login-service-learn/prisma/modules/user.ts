import { helper } from '../helper';
import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
export default async () => {
  await helper(async (prisma: PrismaClient) => {
    return await prisma.user.create({
      data: {
        username: Random.string('lower', 5),
        password: '1111',
      },
    });
  });
};
