import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './regester.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
