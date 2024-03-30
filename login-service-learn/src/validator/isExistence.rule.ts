import { BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsExistence(
  // 表名
  table: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            throw new BadRequestException('用户名不能为空');
          }
          const prisma = new PrismaClient();
          return prisma[table]
            .findFirst({
              where: {
                [propertyName]: args.value,
              },
            })
            .then((data) => {
              if (data) {
                return true;
              }
              throw new BadRequestException('该用户名不存在');
            });
        },
      },
    });
  };
}
