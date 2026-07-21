import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { type DB } from 'src/database/client';
import { InjectDb } from 'src/database/database.provider';
import { appointmentsTable } from 'src/database/schema';
import { and, eq } from 'drizzle-orm';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { AppointmentStatus } from 'src/database/schema/columns.helpers';

@Injectable()
export class AppointmentsService {
  constructor(@InjectDb() private readonly db: DB) { }

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
  async getAppointmentsByDoctor(doctorId: number, companyId: number) {
    const data = await this.db
      .select()
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.doctorId, doctorId),
          eq(appointmentsTable.companyId, companyId),
          eq(appointmentsTable.isDeleted, false)
        ),
      );
    return {
      data,
      message: 'Appointments fetched successfully',
    };
  }

  async getAppointmentsByPatient(patientId: number, companyId: number) {
    const data = await this.db
      .select()
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.patientId, patientId),
          eq(appointmentsTable.companyId, companyId),
          eq(appointmentsTable.isDeleted, false)
        ),
      );
    return {
      data,
      message: 'Appointments fetched successfully',
    };
  }

  async getAppointmentsByCompany(companyId: number) {
    const data = await this.db
      .select()
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.companyId, companyId),
          eq(appointmentsTable.isDeleted, false)
        )
      );
    return {
      data,
      message: 'Appointments fetched successfully',
    };
  }

  async getAppointmentById(id: number, companyId: number) {
    const data = await this.db
      .select()
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.id, id),
          eq(appointmentsTable.companyId, companyId),
          eq(appointmentsTable.isDeleted, false)
        ),
      );
    return {
      data,
      message: 'Appointment fetched successfully',
    };
  }

  async rescheduleAppointment(id: number, rescheduleAppointmentDto: RescheduleAppointmentDto, companyId: number) {
    const data = await this.db
      .update(appointmentsTable)
      .set(rescheduleAppointmentDto)
      .where(
        and(
          eq(appointmentsTable.id, id),
          eq(appointmentsTable.companyId, companyId),
          eq(appointmentsTable.isDeleted, false)
        ),
      )
      .returning();
    return {
      data,
      message: 'Appointment rescheduled successfully',
    };
  }

  async updateAppointmentStatus(id: number, status: AppointmentStatus, companyId: number) {
    const data = await this.db
      .update(appointmentsTable)
      .set({ status })
      .where(
        and(
          eq(appointmentsTable.id, id),
          eq(appointmentsTable.companyId, companyId),
          eq(appointmentsTable.isDeleted, false),
          eq(appointmentsTable.status, AppointmentStatus.PENDING)
        ),
      )
      .returning();
    return {
      data,
      message: 'Appointment status updated successfully',
    };
  }

  deleteAppointment(id: number, companyId: number) {
    const data = this.db
      .update(appointmentsTable)
      .set({ isDeleted: true, deletedAt: new Date() })
      .where(
        and(
          eq(appointmentsTable.id, id),
          eq(appointmentsTable.companyId, companyId),
          eq(appointmentsTable.isDeleted, false)
        ),
      )
      .returning();
    return {
      data,
      message: 'Appointment deleted successfully',
    };
  }
}
