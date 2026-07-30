import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmpty, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { AppointmentMedium, AppointmentType } from "src/database/schema/columns.helpers";

export class CreateAppointmentDto {

    @ApiProperty({ example: 1 })
    @IsPositive()
    @IsInt()
    patientId!: number;

    @ApiProperty({ example: 2 })
    @IsPositive()
    @IsInt()
    doctorId!: number;

    @IsEmpty()
    companyId!: number;

    @IsEmpty()
    createdBy!: number;

    @ApiProperty({ example: '2026-08-01' })
    @IsNotEmpty()
    date!: string;

    @ApiProperty({ example: '10:00 AM' })
    @IsNotEmpty()
    time!: string;

    @ApiProperty({ enum: AppointmentMedium, example: AppointmentMedium.OFFLINE })
    @IsEnum(AppointmentMedium)
    medium!: AppointmentMedium;

    @ApiPropertyOptional({ example: 'Regular checkup' })
    @IsString()
    @IsOptional()
    note?: string;

    @ApiProperty({ enum: AppointmentType, example: AppointmentType.WALK_IN })
    @IsEnum(AppointmentType)
    type!: AppointmentType;
}