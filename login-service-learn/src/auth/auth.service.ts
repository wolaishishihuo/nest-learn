import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { RegesterDto } from './dto/regester.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
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
  async login(loginDto: LoginDto) {
    const user = await this.prismaServce.user.findFirst({
      where: {
        username: loginDto.username,
      },
    });
    const isMatch = await verify(user.password, loginDto.password);
    if (!isMatch) {
      throw new BadGatewayException('密码错误');
    }
    return this.jwtSign(user);
  }
}
