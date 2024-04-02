import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('regester')
  regester(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post('login')
  login(@Body() loginDio: LoginDto) {
    return this.authService.login(loginDio);
  }
  @Get('getUserInfo')
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() req: Request) {
    return req.user;
  }
}
