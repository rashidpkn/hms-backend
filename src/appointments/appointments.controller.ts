import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { type AuthUser, GetUser } from 'src/users/auth/getUser.decorator';

@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto,@GetUser() user: AuthUser) {
    createAppointmentDto.companyId = user.companyId;
    createAppointmentDto.createdBy = user.id;
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }
}
