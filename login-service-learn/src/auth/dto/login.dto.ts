import { IsNotEmpty } from 'class-validator';
import { IsExistence } from 'src/validator/isExistence.rule';

export class LoginDto {
  @IsExistence('user')
  username: string;
  @IsNotEmpty()
  password: string;
}
