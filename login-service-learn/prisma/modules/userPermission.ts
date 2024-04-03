import { helper } from '../helper';
import { PrismaClient } from '@prisma/client';

export default async () => {
  await helper(async (prisma: PrismaClient) => {
    // 从现有的用户和权限中选择一个用户和一个权限
    const users = await prisma.user.findMany();
    const permissions = await prisma.permission.findMany();
    // 确保至少存在一个用户和一个权限
    if (users.length > 0 && permissions.length > 0) {
      const randomUserIndex = Math.floor(Math.random() * users.length);
      const randomPermissionIndex = Math.floor(
        Math.random() * permissions.length,
      );

      const userId = users[randomUserIndex].id;
      const permissionId = permissions[randomPermissionIndex].id;

      // 检查是否已经存在这样一个用户权限关联
      const userPermissionExists = await prisma.user_Permission.findUnique({
        where: { userId_permissionId: { userId, permissionId } },
      });

      // 如果不存在这样的关联则创建它
      if (!userPermissionExists) {
        return await prisma.user_Permission.create({
          data: {
            userId: userId,
            permissionId: permissionId,
          },
        });
      } else {
        console.log(
          `The permission with id ${permissionId} is already assigned to user with id ${userId}.`,
        );
      }
    } else {
      console.log(
        'There must be at least one user and one permission to create a User_Permission.',
      );
    }
  });
};
