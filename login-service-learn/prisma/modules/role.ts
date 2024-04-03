import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default async () => {
  await prisma.role.createMany({
    data: [
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ],
  });
};
