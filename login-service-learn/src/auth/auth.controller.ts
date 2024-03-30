import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegesterDto } from './dto/regester.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @Get('getAll')
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.authService.getAll();
  }
}
