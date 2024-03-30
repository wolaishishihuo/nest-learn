import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegesterDto } from './dto/regester.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('regester')
  regester(@Body() regesterDto: RegesterDto) {
    return this.authService.register(regesterDto);
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
