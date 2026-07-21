import { pgTable } from "drizzle-orm/pg-core";
import { patientsTable } from "./patients.schema";
import { usersTable } from "./users.schema";
import { companiesTable } from "./company.schema";
import { timestamps } from "./columns.helpers";
import { vitalsTable } from "./vitals.schema";
import { prescriptionsTable } from "./prescriptions.schema";
import { appointmentsTable } from "./appointments.schema";

export const consultationsTable = pgTable("consultations", (t)=>({
    id: t.serial("id").primaryKey(),
    patientId: t.integer("patient_id").references(() => patientsTable.id).notNull(),
    doctorId: t.integer("doctor_id").references(() => usersTable.id).notNull(),
    companyId: t.integer("company_id").references(() => companiesTable.id).notNull(),
    appointmentId: t.integer("appointment_id").references(() => appointmentsTable.id).unique(),
    prescriptionId: t.integer("prescription_id").references(() => prescriptionsTable.id).unique(),
    vitalId: t.integer("vital_id").references(() => vitalsTable.id).unique(),
    chiefComplaint: t.text("chief_complaint"),
    examination: t.text("examination"),
    presentHistory: t.text("present_history"),
    pastHistory: t.text("past_history"),
    diagnosis: t.text("diagnosis"),
    treatment: t.text("treatment").array(),
    labOrders: t.text("lab_orders").array(),
    
    notes: t.text("notes"),
    ...timestamps
}))