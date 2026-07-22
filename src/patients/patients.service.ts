import { Injectable } from '@nestjs/common';
import type { DB } from 'src/database/client';
import { InjectDb } from 'src/database/database.provider';
import { RegisterPatientDto } from './dto/register.dto';
import { patientsTable } from 'src/database/schema/patients.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class PatientsService {
  constructor(@InjectDb() private readonly db: DB) { }

  async create(createPatientDto: RegisterPatientDto) {
    const lastPatient = await this.db.query.patientsTable.findFirst({
      where: eq(patientsTable.companyId, createPatientDto.companyId),
      orderBy: (patients, { desc }) => [desc(patients.id)],
    });
    createPatientDto.patientCode = (lastPatient?.patientCode ?? 0) + 1;

    const data = await this.db
      .insert(patientsTable)
      .values(createPatientDto)
      .returning();
    return {
      data: data[0],
      message: 'Patient created successfully',
    };
  }

  async getPatientsByCompany(companyId: number) {
    const patients = await this.db.query.patientsTable.findMany({
      where: eq(patientsTable.companyId, companyId),
    });
    return {
      data: patients,
      message: 'Patients fetched successfully',
    }
  }

  async getPatientsByDoctor(doctorId: number, companyId: number) {
    const patients = await this.db.query.patientsTable.findMany({
      where: and(eq(patientsTable.primaryDoctorId, doctorId), eq(patientsTable.companyId, companyId)),
    });
    return {
      data: patients,
      message: 'Patients fetched successfully',
    }
  }
  async getSingle(id: number, companyId: number) {
    const patient = await this.db.query.patientsTable.findFirst({
      where: and(eq(patientsTable.id, id), eq(patientsTable.companyId, companyId)),
    });
    return {
      data: patient,
      message: 'Patient fetched successfully',
    }
  }
}
