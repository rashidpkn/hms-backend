import { Global, Injectable, Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Appointment,
  AppointmentSchema,
  Consultation,
  ConsultationSchema,
  Patient,
  PatientSchema,
  Prescription,
  PrescriptionSchema,
  Profile,
  ProfileSchema,
  Sequence,
  SequenceSchema,
  User,
  UserSchema,
  Vital,
  VitalSchema,
} from './schema';

@Injectable()
export class SequencesService {
  constructor(
    @InjectModel(Sequence.name) private readonly model: Model<Sequence>,
  ) {}

  async next(name: string): Promise<number> {
    const sequence = await this.model
      .findOneAndUpdate(
        { name },
        { $inc: { value: 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();
    return sequence.value;
  }
}

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Consultation.name, schema: ConsultationSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: Prescription.name, schema: PrescriptionSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Sequence.name, schema: SequenceSchema },
      { name: User.name, schema: UserSchema },
      { name: Vital.name, schema: VitalSchema },
    ]),
  ],
  providers: [SequencesService],
  exports: [MongooseModule, SequencesService],
})
export class DatabaseModule {}
