import { pgTable } from 'drizzle-orm/pg-core';
import { patientsTable } from './patients.schema';

export const prescriptionsTable = pgTable('prescriptions', (t) => ({
  id: t.serial('id').primaryKey(),
  patientId: t
    .integer('patient_id')
    .references(() => patientsTable.id)
    .notNull(), 
  items: t.jsonb('items').$type<PrescriptionItem[]>().notNull(),
}));

export type PrescriptionItem = {
  name: string;
  dosage: string;
  frequency: string;
  foodRelation: string;
  duration: string;
};
