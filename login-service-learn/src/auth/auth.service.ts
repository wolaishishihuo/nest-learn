import { Inject, Injectable } from '@nestjs/common';
import { RegesterDto } from './dto/regester.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private readonly prismaServce: PrismaService) {}
  @Inject(JwtService) private jwtService: JwtService;
  async register(regesterDto: RegesterDto) {
    const user = await this.prismaServce.user.create({
      data: {
        username: regesterDto.username,
        password: await hash(regesterDto.password),
      },
    });
    return this.jwtSign(user);
  }
  async jwtSign(user: User) {
    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });
    return {
      token,
    };
  }
}
