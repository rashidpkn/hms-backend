import { decimal, pgTable } from "drizzle-orm/pg-core";
import { patientsTable } from "./patients.schema";
import { timestamps } from "./columns.helpers";

export const vitalsTable = pgTable("vitals", (t)=>({
    id: t.serial("id").primaryKey(),
    patientId: t.integer("patient_id").references(() => patientsTable.id).notNull(),
    height: decimal('height', { precision: 5, scale: 2 }), // Height in centimeters
    weight: decimal('weight', { precision: 5, scale: 2 }), // Weight in kilograms
    temperature: t.real("temperature"),
    temperature_unit: t.text("temperature_unit"),
    pulse: t.integer("pulse"),
    spo2: t.real("spo2"),
    respiratory_rate: t.integer("respiratory_rate"),
    blood_pressure: t.text("blood_pressure"),
    ...timestamps
}))