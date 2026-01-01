import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;
}