import { pgTable } from "drizzle-orm/pg-core";
import { AppointmentMedium, AppointmentStatus, AppointmentType, timestamps } from "./columns.helpers";
import { patientsTable } from "./patients.schema";
import { usersTable } from "./users.schema";
import { pgEnum } from "drizzle-orm/pg-core";

export const appointmentStatusEnum = pgEnum("appointment_status", AppointmentStatus)
export const appointmentMediumEnum = pgEnum("appointment_medium", AppointmentMedium)
export const appointmentTypeEnum = pgEnum("appointment_type", AppointmentType)

export const appointmentsTables = pgTable("appointments", (t) => ({
    id: t.serial("id").primaryKey(),
    patientId: t.integer("patient_id").references(() => patientsTable.id).notNull(),
    doctorId: t.integer("doctor_id").references(() => usersTable.id).notNull(),
    date: t.date("appointment_date").notNull(),
    time: t.time("appointment_time").notNull(),
    medium: appointmentMediumEnum().notNull().default(AppointmentMedium.OFFLINE),
    note: t.text("note"),
    type: appointmentTypeEnum().notNull().default(AppointmentType.GENERAL),
    status: appointmentStatusEnum().notNull().default(AppointmentStatus.PENDING),
    ...timestamps,
}))