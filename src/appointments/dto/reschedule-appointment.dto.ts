import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RescheduleAppointmentDto {
    @IsString()
    @IsNotEmpty()
    time: string;
    @IsString()
    @IsNotEmpty()
    date: string;
}