
import { boolean, timestamp } from "drizzle-orm/pg-core";

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

export const enum CompanyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DOCTOR = 'DOCTOR',
  PHARMACIST = 'PHARMACIST',
  RECEPTIONIST = 'RECEPTIONIST',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  BILLING = 'BILLING'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  LEAVE = 'LEAVE'
}


export const enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export const enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  UNKNOWN = "Unknown",
}

export type AllergySeverity =
  | "Mild"
  | "Moderate"
  | "Severe";

  export const enum PatientStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DECEASED = "DECEASED",
  }