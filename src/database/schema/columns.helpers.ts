
import { boolean,timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
    createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
isDeleted: boolean("is_deleted").default(false).notNull(),
}

export interface AddressType {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}