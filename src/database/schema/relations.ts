import { relations } from 'drizzle-orm';
import { usersTable } from './users.schema';
import { companiesTable } from './company.schema';
import { profilesTable } from './profiles.schema';
import { patientsTable } from './patients.schema';

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [usersTable.companyId],
    references: [companiesTable.id],
  }),
  profile: one(profilesTable, {
    fields: [usersTable.id],
    references: [profilesTable.userId],
  }),
  patients: many(patientsTable),
  patientsCreatedBy: many(patientsTable),
}));

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  users: many(usersTable),
  patients: many(patientsTable),
}));

export const profilesRelations = relations(profilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profilesTable.userId],
    references: [usersTable.id],
  }),
}));

export const patientsRelations = relations(patientsTable, ({ one }) => ({
  doctor: one(usersTable, {
    fields: [patientsTable.primaryDoctorId],
    references: [usersTable.id],
  }),
  createdBy: one(usersTable, {
    fields: [patientsTable.createdBy],
    references: [usersTable.id],
  }),
  company: one(companiesTable, {
    fields: [patientsTable.companyId],
    references: [companiesTable.id],
  }),
}));
