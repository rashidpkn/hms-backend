import { Model } from 'mongoose';
import { validateSync } from 'class-validator';
import { UserSchema } from './schema/users.schema';
import { Patient, PatientSchema } from './schema/patients.schema';
import { Appointment, AppointmentSchema } from './schema/appointments.schema';
import { ConsultationSchema } from './schema/consultations.schema';
import { User } from './schema/users.schema';
import { SequencesService } from './database.module';
import { PatientsService } from '../patients/patients.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { RegisterUserDto } from '../users/dto/register.dto';
import { RegisterPatientDto } from '../patients/dto/register.dto';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';
import { UserRoles } from './schema/columns.helpers';

describe('Single-practice backend', () => {
  it('has no tenant field or company relationship on records', () => {
    for (const schema of [
      UserSchema,
      PatientSchema,
      AppointmentSchema,
      ConsultationSchema,
    ]) {
      expect(schema.path('companyId')).toBeUndefined();
    }
    expect(UserSchema.virtualpath('company')).toBeNull();
    expect(PatientSchema.indexes()).toContainEqual([
      { patientCode: 1 },
      expect.objectContaining({ unique: true }),
    ]);
  });

  it('validates registration without a company', () => {
    const dto = Object.assign(new RegisterUserDto(), {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      role: UserRoles.DOCTOR,
    });
    expect(validateSync(dto)).toHaveLength(0);
  });

  it('creates a patient using the global patient sequence', async () => {
    const patients = { create: jest.fn().mockResolvedValue({ id: 42 }) };
    const users = { exists: jest.fn().mockResolvedValue(true) };
    const sequences = { next: jest.fn().mockResolvedValue(42) };
    const service = new PatientsService(
      patients as unknown as Model<Patient>,
      users as unknown as Model<User>,
      sequences as unknown as SequencesService,
    );
    await service.create(
      Object.assign(new RegisterPatientDto(), {
        firstName: 'Test',
        lastName: 'Patient',
        createdBy: 1,
      }),
    );
    expect(sequences.next).toHaveBeenCalledWith('patients');
    expect(patients.create).toHaveBeenCalledWith({
      firstName: 'Test',
      lastName: 'Patient',
      createdBy: 1,
      id: 42,
      patientCode: 42,
    });
  });

  it('queries patients by doctor and record ID without tenant filters', async () => {
    const patients = {
      find: jest.fn().mockReturnValue({ exec: () => Promise.resolve([]) }),
      findOne: jest
        .fn()
        .mockReturnValue({ exec: () => Promise.resolve({ id: 1 }) }),
    };
    const service = new PatientsService(
      patients as unknown as Model<Patient>,
      {} as Model<User>,
      {} as SequencesService,
    );
    await service.getAllPatients();
    await service.getPatientsByDoctor(3);
    await service.getSingle(1);
    expect(patients.find.mock.calls).toEqual([[{}], [{ primaryDoctorId: 3 }]]);
    expect(patients.findOne).toHaveBeenCalledWith({ id: 1 });
  });

  it('creates appointments using patient, doctor, and creator references only', async () => {
    const appointments = { create: jest.fn().mockResolvedValue({ id: 7 }) };
    const patients = { exists: jest.fn().mockResolvedValue(true) };
    const users = { exists: jest.fn().mockResolvedValue(true) };
    const sequences = { next: jest.fn().mockResolvedValue(7) };
    const service = new AppointmentsService(
      appointments as unknown as Model<Appointment>,
      patients as unknown as Model<Patient>,
      users as unknown as Model<User>,
      sequences as unknown as SequencesService,
    );
    const dto = Object.assign(new CreateAppointmentDto(), {
      patientId: 1,
      doctorId: 2,
      createdBy: 3,
    });
    await service.createAppointment(dto);
    expect(appointments.create).toHaveBeenCalledWith({ ...dto, id: 7 });
    expect(users.exists.mock.calls).toEqual([[{ id: 2 }], [{ id: 3 }]]);
  });

  it('updates appointments with record and state checks intact', async () => {
    const appointments = {
      findOneAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: () => Promise.resolve({ id: 7 }) }),
    };
    const service = new AppointmentsService(
      appointments as unknown as Model<Appointment>,
      {} as Model<Patient>,
      {} as Model<User>,
      {} as SequencesService,
    );
    await service.deleteAppointment(7);
    expect(appointments.findOneAndUpdate).toHaveBeenCalledWith(
      { id: 7, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: expect.any(Date) as Date } },
      { new: true },
    );
  });
});
