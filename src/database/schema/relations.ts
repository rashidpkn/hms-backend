import { relations } from 'drizzle-orm';
import { usersTable } from './users.schema';
import { companiesTable } from './company.schema';
import { profilesTable } from './profiles.schema';
import { patientsTable } from './patients.schema';
import { appointmentsTable } from './appointments.schema';

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
}));

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  users: many(usersTable),
  patients: many(patientsTable),
  appointments: many(appointmentsTable),
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
}));