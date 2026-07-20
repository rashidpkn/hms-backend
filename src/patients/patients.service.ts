import { Injectable } from '@nestjs/common';
import type { DB } from 'src/database/client';
import { InjectDb } from 'src/database/database.provider';
import { RegisterPatientDto } from './dto/register.dto';
import { patientsTable } from 'src/database/schema/patients.schema';

@Injectable()
export class PatientsService {
    constructor(@InjectDb() private readonly db: DB) { }

    async create(createPatientDto: RegisterPatientDto) {
        const lastPatient = await this.db.query.patientsTable.findFirst({
            orderBy: (patients, { desc }) => [desc(patients.id)],
        })
        createPatientDto.patientCode = (lastPatient?.patientCode ?? 0) + 1;

        createPatientDto.createdBy = 1 // need to change before production

        const data = await this.db.insert(patientsTable).values(createPatientDto).returning();
        return {
            data: data[0],
            message: "Patient created successfully",
        };
    }
}
