import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SequencesService } from 'src/database/database.module';
import { Appointment } from 'src/database/schema/appointments.schema';
import { AppointmentStatus } from 'src/database/schema/columns.helpers';
import { Patient } from 'src/database/schema/patients.schema';
import { User } from 'src/database/schema/users.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointments: Model<Appointment>,
    @InjectModel(Patient.name) private readonly patients: Model<Patient>,
    @InjectModel(User.name) private readonly users: Model<User>,
    private readonly sequences: SequencesService,
  ) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    if (!(await this.patients.exists({ id: createAppointmentDto.patientId }))) {
      throw new BadRequestException('Patient not found');
    }
    if (!(await this.users.exists({ id: createAppointmentDto.doctorId }))) {
      throw new BadRequestException('Doctor not found');
    }
    if (!(await this.users.exists({ id: createAppointmentDto.createdBy }))) {
      throw new BadRequestException('Creator not found');
    }

    const data = await this.appointments.create({
      ...createAppointmentDto,
      id: await this.sequences.next('appointments'),
    });
    return { data: [data], message: 'Appointment created successfully' };
  }

  async getAppointmentsByDoctor(doctorId: number) {
    const data = await this.appointments
      .find({ doctorId, isDeleted: false })
      .exec();
    return { data, message: 'Appointments fetched successfully' };
  }

  async getAppointmentsByPatient(patientId: number) {
    const data = await this.appointments
      .find({ patientId, isDeleted: false })
      .exec();
    return { data, message: 'Appointments fetched successfully' };
  }

  async getAllAppointments() {
    const data = await this.appointments.find({ isDeleted: false }).exec();
    return { data, message: 'Appointments fetched successfully' };
  }

  async getAppointmentById(id: number) {
    const data = await this.appointments
      .findOne({ id, isDeleted: false })
      .exec();
    if (!data) throw new BadRequestException('Appointment not found');
    return { data, message: 'Appointment fetched successfully' };
  }

  async rescheduleAppointment(
    id: number,
    rescheduleAppointmentDto: RescheduleAppointmentDto,
  ) {
    const data = await this.appointments
      .findOneAndUpdate(
        { id, isDeleted: false },
        { $set: rescheduleAppointmentDto },
        { new: true, runValidators: true },
      )
      .exec();
    if (!data) throw new BadRequestException('Appointment not found');
    return { data, message: 'Appointment rescheduled successfully' };
  }

  async updateAppointmentStatus(id: number, status: AppointmentStatus) {
    const data = await this.appointments
      .findOneAndUpdate(
        {
          id,
          isDeleted: false,
          status: AppointmentStatus.PENDING,
        },
        { $set: { status } },
        { new: true, runValidators: true },
      )
      .exec();
    if (!data) {
      throw new BadRequestException(
        'Appointment not found or status is not pending',
      );
    }
    return { data, message: 'Appointment status updated successfully' };
  }

  async deleteAppointment(id: number) {
    const data = await this.appointments
      .findOneAndUpdate(
        { id, isDeleted: false },
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true },
      )
      .exec();
    if (!data) throw new BadRequestException('Appointment not found');
    return { data, message: 'Appointment deleted successfully' };
  }
}
