import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { type AuthUser, GetUser } from 'src/users/auth/getUser.decorator';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { AppointmentStatus } from 'src/database/schema/columns.helpers';

@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @GetUser() user: AuthUser) {
    createAppointmentDto.companyId = user.companyId;
    createAppointmentDto.createdBy = user.id;
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get("doctor/:id")
  async getAppointmentsByDoctor(@Param("id") doctorId: number, @GetUser() user: AuthUser) {
    return this.appointmentsService.getAppointmentsByDoctor(doctorId, user.companyId);
  }

  @Get("patient/:id")
  async getAppointmentsByPatient(@Param("id") patientId: number, @GetUser() user: AuthUser) {
    return this.appointmentsService.getAppointmentsByPatient(patientId, user.companyId);
  }

  @Get("company/:id")
  async getAppointmentsByCompany(@Param("id") companyId: number, @GetUser() user: AuthUser) {
    if (companyId != user.companyId) {
      throw new ForbiddenException("You are not authorized to access this company's appointments");
    }
    return this.appointmentsService.getAppointmentsByCompany(companyId,);
  }

  @Get(":id")
  async getAppointmentById(@Param("id") id: number, @GetUser() user: AuthUser) {
    return this.appointmentsService.getAppointmentById(id, user.companyId);
  }

  @Patch("reschedule/:id")
  async rescheduleAppointment(@Param("id") id: number, @Body() rescheduleAppointmentDto: RescheduleAppointmentDto, @GetUser() user: AuthUser) {
    return this.appointmentsService.rescheduleAppointment(id, rescheduleAppointmentDto, user.companyId);
  }

  @Patch("status/:id")
  async updateAppointmentStatus(@Param("id") id: number, @Body() body: { status: AppointmentStatus }, @GetUser() user: AuthUser) {
    return this.appointmentsService.updateAppointmentStatus(id, body.status, user.companyId);
  }

  @Delete(":id")
  async deleteAppointment(@Param("id") id: number, @GetUser() user: AuthUser) {
    return this.appointmentsService.deleteAppointment(id, user.companyId);
  }

}
