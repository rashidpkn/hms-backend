import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { type AuthUser, GetUser } from 'src/users/auth/getUser.decorator';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { ChangeStatusDto } from './dto/change-status.dto';

import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @GetUser() user: AuthUser,
  ) {
    createAppointmentDto.createdBy = user.id;
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get('doctor/:id')
  async getAppointmentsByDoctor(@Param('id', ParseIntPipe) doctorId: number) {
    return this.appointmentsService.getAppointmentsByDoctor(doctorId);
  }

  @Get('patient/:id')
  async getAppointmentsByPatient(@Param('id', ParseIntPipe) patientId: number) {
    return this.appointmentsService.getAppointmentsByPatient(patientId);
  }

  @Get()
  getAll() {
    return this.appointmentsService.getAllAppointments();
  }

  @Get(':id')
  async getAppointmentById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.getAppointmentById(id);
  }

  @Patch('reschedule/:id')
  async rescheduleAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() rescheduleAppointmentDto: RescheduleAppointmentDto,
  ) {
    return this.appointmentsService.rescheduleAppointment(
      id,
      rescheduleAppointmentDto,
    );
  }

  @Patch('status/:id')
  async updateAppointmentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ChangeStatusDto,
  ) {
    return this.appointmentsService.updateAppointmentStatus(id, body.status);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.deleteAppointment(id);
  }
}
