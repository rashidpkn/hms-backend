import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SequencesService } from 'src/database/database.module';
import { Patient } from 'src/database/schema/patients.schema';
import { User } from 'src/database/schema/users.schema';
import { RegisterPatientDto } from './dto/register.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private readonly patients: Model<Patient>,
    @InjectModel(User.name) private readonly users: Model<User>,
    private readonly sequences: SequencesService,
  ) {}

  async create(createPatientDto: RegisterPatientDto) {
    if (!(await this.users.exists({ id: createPatientDto.createdBy }))) {
      throw new BadRequestException('Creator not found');
    }
    if (
      createPatientDto.primaryDoctorId &&
      !(await this.users.exists({ id: createPatientDto.primaryDoctorId }))
    ) {
      throw new BadRequestException('Primary doctor not found');
    }

    const id = await this.sequences.next('patients');
    const data = await this.patients.create({
      ...createPatientDto,
      id,
      patientCode: id,
    });
    return { data, message: 'Patient created successfully' };
  }

  async getAllPatients() {
    const data = await this.patients.find({}).exec();
    return { data, message: 'Patients fetched successfully' };
  }

  async getPatientsByDoctor(doctorId: number) {
    const data = await this.patients.find({ primaryDoctorId: doctorId }).exec();
    return { data, message: 'Patients fetched successfully' };
  }

  async getSingle(id: number) {
    const data = await this.patients.findOne({ id }).exec();
    return { data, message: 'Patient fetched successfully' };
  }
}
