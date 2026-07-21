import { pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const appointmentsTables = pgTable("appointments", (t) => ({
    id: t.serial("id").primaryKey(),

    ...timestamps,
}))