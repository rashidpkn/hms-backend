import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import type { AddressType } from 'src/database/schema/columns.helpers';
import { UserRoles } from 'src/database/schema/columns.helpers';

export class RegisterUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  lastName!: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  password!: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsPhoneNumber()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.replace(/\s+/g, ''))
  phoneNumber!: string;

  @ApiPropertyOptional()
  @IsOptional()
  address?: AddressType;

  @ApiPropertyOptional({ example: '50000' })
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string | number }) => value.toString().trim())
  salary!: string;

  @ApiProperty({ enum: UserRoles, example: UserRoles.DOCTOR })
  @IsEnum(UserRoles)
  role!: UserRoles;
}
