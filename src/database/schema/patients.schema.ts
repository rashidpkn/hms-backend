import { pgTable } from "drizzle-orm/pg-core";
import { AddressType, timestamps, BloodGroup, Gender, AllergySeverity, PatientStatus } from "./columns.helpers";
import { pgEnum } from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema";
import { companiesTable } from "./company.schema";

export const BloodGroupEnum = pgEnum("blood_group", [BloodGroup.A_POSITIVE, BloodGroup.A_NEGATIVE, BloodGroup.B_POSITIVE, BloodGroup.B_NEGATIVE, BloodGroup.AB_POSITIVE, BloodGroup.AB_NEGATIVE, BloodGroup.O_POSITIVE, BloodGroup.O_NEGATIVE]);
export const GenderEnum = pgEnum("gender", [Gender.MALE, Gender.FEMALE, Gender.UNKNOWN]);
export const PatientStatusEnum = pgEnum("patient_status", [PatientStatus.ACTIVE, PatientStatus.INACTIVE, PatientStatus.DECEASED]);

export const patientsTable = pgTable('patients', (t) => ({
  id: t.serial('id').primaryKey(),
  firstName: t.text('first_name').notNull(),
  lastName: t.text('last_name').notNull(),
  patientCode: t.integer("patient_code").notNull().unique(),
  email: t.text('email'),
  phoneNumber: t.text('phone_number'),
  address: t.jsonb('address').$type<AddressType>(),
  primaryDoctorId: t.integer('primary_doctor_id').references(() => usersTable.id, {
    onDelete: 'restrict',
  }),
  dateOfBirth: t.timestamp('date_of_birth'),
  gender: GenderEnum('gender').default(Gender.UNKNOWN).notNull(),
  bloodGroup: BloodGroupEnum('blood_group'),
  allergies: t.jsonb('allergies').$type<{ allergen: string; reaction: string; severity: AllergySeverity }[]>(),
  emergencyContact: t.jsonb('emergency_contact').$type<{ name: string; relationship: string; phoneNumber: string }>(),
  insuranceDetails: t.jsonb('insurance_details').$type<{ providerName: string; policyNumber: string; coverageDetails?: string }>(),
  notes: t.text("notes"),
  status: PatientStatusEnum()
    .notNull()
    .default(PatientStatus.ACTIVE),
  createdBy: t.integer('created_by').references(() => usersTable.id, {
    onDelete: 'restrict',
  }).notNull(),
  companyId: t.integer('company_id').references(() => companiesTable.id, {
    onDelete: 'restrict',
  }).notNull(),
  ...timestamps,
}));