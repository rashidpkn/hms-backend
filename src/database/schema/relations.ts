import { relations } from 'drizzle-orm';
import { usersTable } from './users.schema';
import { companiesTable } from './company.schema';
import { profilesTable } from './profiles.schema';
import { patientsTable } from './patients.schema';
import { appointmentsTable } from './appointments.schema';
import { consultationsTable } from './consultations.schema';
import { prescriptionsTable } from './prescriptions.schema';
import { vitalsTable } from './vitals.schema';

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [usersTable.companyId],
    references: [companiesTable.id],
  }),
  profile: one(profilesTable, {
    fields: [usersTable.id],
    references: [profilesTable.userId],
  }),
  doctorPatients: many(patientsTable, {
    relationName: 'doctorPatients',
  }),

  createdPatients: many(patientsTable, {
    relationName: 'createdPatients',
  }),
  appointments: many(appointmentsTable),
  createdAppointments: many(appointmentsTable, {
    relationName: 'createdAppointments',
  }),
  consultations: many(consultationsTable),

}));

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  users: many(usersTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
  consultations: many(consultationsTable),
}));

export const profilesRelations = relations(profilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profilesTable.userId],
    references: [usersTable.id],
  }),
}));

export const patientsRelations = relations(patientsTable, ({ one,many }) => ({
 doctor: one(usersTable, {
  relationName: 'doctorPatients',
  fields: [patientsTable.primaryDoctorId],
  references: [usersTable.id],
}),

createdBy: one(usersTable, {
  relationName: 'createdPatients',
  fields: [patientsTable.createdBy],
  references: [usersTable.id],
}),
  company: one(companiesTable, {
    fields: [patientsTable.companyId],
    references: [companiesTable.id],
  }),

  appointments: many(appointmentsTable),
  consultations: many(consultationsTable),
  prescriptions: many(prescriptionsTable),
  vitals: many(vitalsTable)
}));


export const appointmentsRelations = relations(appointmentsTable, ({ one }) => ({
  patient: one(patientsTable, {
    fields: [appointmentsTable.patientId],
    references: [patientsTable.id],
  }),
  doctor: one(usersTable, {
    fields: [appointmentsTable.doctorId],
    references: [usersTable.id],
  }),
  company: one(companiesTable, {
    fields: [appointmentsTable.companyId],
    references: [companiesTable.id],
  }),
  createdBy: one(usersTable, {
    relationName: 'createdAppointments',
    fields: [appointmentsTable.createdBy],
    references: [usersTable.id],
  }),
  consultation: one(consultationsTable, {
    fields: [appointmentsTable.id],
    references: [consultationsTable.appointmentId],
  })
}));


export const consultationsRelations = relations(consultationsTable, ({ one }) => ({
  patient: one(patientsTable, {
    fields: [consultationsTable.patientId],
    references: [patientsTable.id],
  }),
  doctor: one(usersTable, {
    fields: [consultationsTable.doctorId],
    references: [usersTable.id],
  }),
  company: one(companiesTable, {
    fields: [consultationsTable.companyId],
    references: [companiesTable.id],
  }),
  appointment: one(appointmentsTable, {
    fields: [consultationsTable.appointmentId],
    references: [appointmentsTable.id],
  }),
  prescriptions: one(prescriptionsTable,{
    fields: [consultationsTable.prescriptionId],
    references: [prescriptionsTable.id],
  }),
  vitals: one(vitalsTable,{
    fields: [consultationsTable.vitalId],
    references: [vitalsTable.id],
  })
}))

export const prescriptionsRelations = relations(prescriptionsTable, ({ one }) => ({
  patient: one(patientsTable, {
    fields: [prescriptionsTable.patientId],
    references: [patientsTable.id],
  }),
  consultation: one(consultationsTable, {
    fields: [prescriptionsTable.id],
    references: [consultationsTable.prescriptionId],
  })
}));

export const vitalsRelations = relations(vitalsTable, ({ one }) => ({
  patient: one(patientsTable, {
    fields: [vitalsTable.patientId],
    references: [patientsTable.id],
  }),
  consultation: one(consultationsTable, {
    fields: [vitalsTable.id],
    references: [consultationsTable.vitalId],
  })
}))