import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { type DB } from 'src/database/client';
import { InjectDb } from 'src/database/database.provider';
import { appointmentsTable } from 'src/database/schema';

@Injectable()
export class AppointmentsService {
  constructor(@InjectDb() private readonly db: DB) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const data = await this.db
      .insert(appointmentsTable)
      .values(createAppointmentDto)
      .returning()
      .execute();
    return {
      data,
      message: 'Appointment created successfully',
    };
  }
}
