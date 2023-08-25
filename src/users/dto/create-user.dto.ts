import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'pedrito1421', required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Pedro', required: true })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Alvarez', required: true })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'pedrito1421@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: true, required: false, default: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  active: boolean;
}
