import { IsNotEmpty } from 'class-validator';
export class RegesterDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  password_confirm: string;
}
