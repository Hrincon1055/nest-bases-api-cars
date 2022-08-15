/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  readonly brand: string;
  @IsString()
  readonly model: string;
}
