import { IsEnum, IsNotEmpty } from "class-validator";
import { AppointmentStatus } from "src/database/schema/columns.helpers";

export class ChangeStatusDto {
    @IsEnum(AppointmentStatus)
    @IsNotEmpty()
    status: AppointmentStatus;
}