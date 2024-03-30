import { Injectable } from '@nestjs/common';
import { RegesterDto } from './dto/regester.dto';

@Injectable()
export class AuthService {
  register(regesterDto: RegesterDto) {
    return regesterDto;
  }
}
