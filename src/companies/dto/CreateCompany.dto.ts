import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as columnsHelpers from 'src/database/schema/columns.helpers';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Acme Hospital' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  name!: string;

  @ApiProperty({ example: 'info@acme.com' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email!: string;

  @ApiProperty({ example: '+1234567890' })
  @IsPhoneNumber()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  phoneNumber!: string;

  @ApiPropertyOptional({ example: 'support@acme.com' })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email2?: string;

  @ApiPropertyOptional({ example: '+1987654321' })
  @IsPhoneNumber()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  phoneNumber2?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address!: columnsHelpers.AddressType;

  @ApiPropertyOptional({ enum: columnsHelpers.CompanyStatus, example: columnsHelpers.CompanyStatus.ACTIVE })
  @IsEnum([
    columnsHelpers.CompanyStatus.ACTIVE,
    columnsHelpers.CompanyStatus.INACTIVE,
    columnsHelpers.CompanyStatus.SUSPENDED,
  ])
  @IsOptional()
  status?: columnsHelpers.CompanyStatus;

  @ApiPropertyOptional({ example: 'LIC-12345' })
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  licenseNumber!: string;

  @ApiProperty({ example: '12000' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  yearlySubscriptionAmount!: string;

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  logo?: string;
}
