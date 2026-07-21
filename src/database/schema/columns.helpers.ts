import { boolean, timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
  isDeleted: boolean('is_deleted').default(false).notNull(),
};

export interface AddressType {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DOCTOR = 'DOCTOR',
  PHARMACIST = 'PHARMACIST',
  RECEPTIONIST = 'RECEPTIONIST',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  BILLING = 'BILLING',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  LEAVE = 'LEAVE',
}

export enum BloodGroup {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  UNKNOWN = 'Unknown',
}

export type AllergySeverity = 'Mild' | 'Moderate' | 'Severe';

export enum PatientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DECEASED = 'DECEASED',
}

export enum AppointmentType {
  GENERAL = 'General',
  FOLLOW_UP = 'Follow_up',
  EMERGENCY = 'Emergency',
  WALK_IN = 'Walk_in',
  BOOKED = 'Booked',
  REFERRAL = 'Referral',
}

export enum AppointmentMedium {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}

export enum AppointmentStatus {
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}