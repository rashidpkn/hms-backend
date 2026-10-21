import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SequencesService } from 'src/database/database.module';
import { Company } from 'src/database/schema/company.schema';
import { Patient } from 'src/database/schema/patients.schema';
import { User } from 'src/database/schema/users.schema';
import { RegisterPatientDto } from './dto/register.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private readonly patients: Model<Patient>,
    @InjectModel(Company.name) private readonly companies: Model<Company>,
    @InjectModel(User.name) private readonly users: Model<User>,
    private readonly sequences: SequencesService,
  ) {}

  async create(createPatientDto: RegisterPatientDto) {
    if (!(await this.companies.exists({ id: createPatientDto.companyId }))) {
      throw new BadRequestException('Company not found');
    }
    if (!(await this.users.exists({ id: createPatientDto.createdBy }))) {
      throw new BadRequestException('Creator not found');
    }
    if (
      createPatientDto.primaryDoctorId &&
      !(await this.users.exists({ id: createPatientDto.primaryDoctorId }))
    ) {
      throw new BadRequestException('Primary doctor not found');
    }

    const patientCode = await this.sequences.next(
      `patient-code-${createPatientDto.companyId}`,
    );
    const data = await this.patients.create({
      ...createPatientDto,
      id: await this.sequences.next('patients'),
      patientCode,
    });
    return { data, message: 'Patient created successfully' };
  }

  async getPatientsByCompany(companyId: number) {
    const data = await this.patients.find({ companyId }).exec();
    return { data, message: 'Patients fetched successfully' };
  }

  async getPatientsByDoctor(doctorId: number, companyId: number) {
    const data = await this.patients
      .find({ primaryDoctorId: doctorId, companyId })
      .exec();
    return { data, message: 'Patients fetched successfully' };
  }

  async getSingle(id: number, companyId: number) {
    const data = await this.patients.findOne({ id, companyId }).exec();
    return { data, message: 'Patient fetched successfully' };
  }
}
