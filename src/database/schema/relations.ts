import { relations } from "drizzle-orm";
import { usersTable } from "./users.schema";
import { companiesTable } from "./company.schema";
import { profilesTable } from "./profiles.schema";

export const usersRelations = relations(usersTable, ({ one }) => ({
  company: one(companiesTable, {
    fields: [usersTable.tenantId],
    references: [companiesTable.id],
  }),
  profile: one(profilesTable, {
    fields: [usersTable.id],
    references: [profilesTable.userId],
  }),
}));

export const companiesRelations = relations(companiesTable, ({ many }) => ({
  users: many(usersTable),
}));


export const profilesRelations = relations(profilesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profilesTable.userId],
    references: [usersTable.id],
  }),
}));

