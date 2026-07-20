import { Transform } from "class-transformer";
import { type AddressType, Gender, BloodGroup, AllergySeverity, PatientStatus } from "src/database/schema/columns.helpers";
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsDate, IsIn, IsEnum, IsArray, ValidateNested, IsOptional, IsUUID, IsEmpty, IsNumber, IsInt, IsPositive } from "class-validator";

export class RegisterPatientDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.trim())
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.trim())
    lastName!: string;

    @IsEmpty()
    patientCode!: number;

    @IsEmail()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
    email?: string;

    @IsPhoneNumber()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.trim())
    phoneNumber?: string;

    @IsOptional()
    address?: AddressType;

    @IsPositive()
    @IsInt()
    @IsOptional()
    primaryDoctorId?: number;

    @IsDate()
    @IsOptional()
    dateOfBirth?: Date;

    @IsEnum(Gender)
    gender?: Gender;

    @IsEnum(BloodGroup)
    @IsOptional()
    bloodGroup?: BloodGroup;

    @IsArray()
    @IsOptional()
    allergies?: { allergen: string; reaction: string; severity: AllergySeverity }[];

    @IsOptional()
    emergencyContact?: { name: string; relationship: string; phoneNumber: string };

    @IsOptional()
    insuranceDetails?: { providerName: string; policyNumber: string; coverageDetails?: string };

    @IsString()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.trim())
    notes?: string;

    @IsEmpty()
    status?: PatientStatus;

    @IsEmpty()
    createdBy!: number;
}