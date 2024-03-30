import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegesterDto } from './dto/regester.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('regester')
  regester(@Body() regesterDto: RegesterDto) {
    return this.authService.register(regesterDto);
  }
}
