import { PartialType } from '@nestjs/mapped-types';
import { RegesterDto } from './regester.dto';

export class UpdateAuthDto extends PartialType(RegesterDto) {}
