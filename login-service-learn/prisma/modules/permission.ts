import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const permissions = [
  {
    name: '读取',
    desc: '允许读取操作',
  },
  {
    name: '写入',
    desc: '允许写入操作',
  },
  {
    name: '删除',
    desc: '允许删除操作',
  },
];
export default async () => {
  // 批量创建权限
  for (const permission of permissions) {
    await prisma.permission.create({
      data: permission,
    });
  }

  // 给id为1的角色分配所有权限
  await prisma.role.update({
    where: { id: 1 },
    data: {
      rolePermissions: {
        create: [1, 2, 3].map((p) => {
          return {
            permission: {
              connect: {
                id: p,
              },
            },
          };
        }),
      },
    },
  });
  await prisma.role.update({
    where: { id: 2 },
    data: {
      rolePermissions: {
        create: {
          permission: {
            connect: {
              id: 1,
            },
          },
        },
      },
    },
  });
};
