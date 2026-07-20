import * as columnsHelpers from "src/database/schema/columns.helpers";
import { IsString, IsEnum, IsNotEmpty, IsOptional, IsEmail, IsPhoneNumber } from "class-validator";
import { Transform } from "class-transformer";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.trim())
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
    email!: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.trim())
    phoneNumber!: string;

    @IsEmail()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
    email2?: string;

    @IsPhoneNumber()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.trim())
    phoneNumber2?: string;

    @IsOptional()
    address!: columnsHelpers.AddressType;

    @IsEnum([columnsHelpers.CompanyStatus.ACTIVE, columnsHelpers.CompanyStatus.INACTIVE, columnsHelpers.CompanyStatus.SUSPENDED])
    @IsOptional()
    status?: columnsHelpers.CompanyStatus;

    @IsString()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.trim())
    licenseNumber!: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.trim())
    yearlySubscriptionAmount!: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }: { value: string }) => value.trim())
    logo?: string;
}