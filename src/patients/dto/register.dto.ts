import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  type AddressType,
  Gender,
  BloodGroup,
  AllergySeverity,
  PatientStatus,
} from 'src/database/schema/columns.helpers';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsEnum,
  IsArray,
  IsOptional,
  IsEmpty,
  IsInt,
  IsPositive,
} from 'class-validator';

export class RegisterPatientDto {
  @ApiProperty({ example: 'Alice' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  firstName!: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value.trim())
  lastName!: string;

  @IsEmpty()
  patientCode!: number;

  @ApiPropertyOptional({ example: 'alice@example.com' })
  @IsEmail()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email?: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsPhoneNumber()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  address?: AddressType;

  @ApiPropertyOptional({ example: 1 })
  @IsPositive()
  @IsInt()
  @IsOptional()
  primaryDoctorId?: number;

  @ApiPropertyOptional({ example: '1990-05-15' })
  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiPropertyOptional({ enum: Gender, example: Gender.FEMALE })
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ enum: BloodGroup, example: BloodGroup.A_POSITIVE })
  @IsEnum(BloodGroup)
  @IsOptional()
  bloodGroup?: BloodGroup;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  allergies?: {
    allergen: string;
    reaction: string;
    severity: AllergySeverity;
  }[];

  @ApiPropertyOptional()
  @IsOptional()
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };

  @ApiPropertyOptional()
  @IsOptional()
  insuranceDetails?: {
    providerName: string;
    policyNumber: string;
    coverageDetails?: string;
  };

  @ApiPropertyOptional({ example: 'Patient notes' })
  @IsString()
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.trim())
  notes?: string;

  @IsEmpty()
  status?: PatientStatus;

  @IsEmpty()
  createdBy!: number;

  @IsEmpty()
  companyId!: number;
}
