import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import type { AddressType } from 'src/database/schema/columns.helpers';
import { UserRoles } from 'src/database/schema/columns.helpers';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  password!: string;

  @IsPhoneNumber()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.replace(/\s+/g, ''))
  phoneNumber!: string;

  @IsOptional()
  address?: AddressType;

  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string | number }) => value.toString().trim())
  salary!: string;

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  companyId!: number;

  @IsEnum(UserRoles)
  role!: UserRoles;
}
