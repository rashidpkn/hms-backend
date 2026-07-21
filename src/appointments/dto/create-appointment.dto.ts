import { IsDate, IsDateString, IsEmpty, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { AppointmentMedium, AppointmentType } from "src/database/schema/columns.helpers";

export class CreateAppointmentDto {
    
    @IsPositive()
    @IsInt()
    patientId!: number;

    @IsPositive()
    @IsInt()
    doctorId!: number;

    @IsEmpty()
    companyId!: number;

    @IsEmpty()
    createdBy!: number;

    @IsNotEmpty()
    date!: string;

    @IsNotEmpty()
    time!: string;

    @IsEnum(AppointmentMedium)
    medium!: AppointmentMedium;

    @IsString()
    @IsOptional()
    note?: string;

    @IsEnum(AppointmentType)
    type!: AppointmentType;
}