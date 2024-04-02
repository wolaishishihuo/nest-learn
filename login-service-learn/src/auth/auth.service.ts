import { BadGatewayException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async findUserByUsername(username: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.findUserByUsername(username);
    if (!user) {
      throw new BadGatewayException('用户名不存在');
    }

    const isMatch = await verify(user.password, password);
    if (!isMatch) {
      throw new BadGatewayException('密码错误');
    }
    return user;
  }

  private async jwtSign(user: User) {
    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });
    return {
      token,
    };
  }

  async register(registerDto: RegisterDto) {
    const foundUser = await this.findUserByUsername(registerDto.username);
    if (foundUser) {
      throw new BadGatewayException('用户名已存在');
    }

    const hashedPassword = await hash(registerDto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        username: registerDto.username,
        password: hashedPassword,
      },
    });

    return this.jwtSign(newUser);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    return this.jwtSign(user);
  }
}
