import { pgTable, pgEnum,decimal } from 'drizzle-orm/pg-core';
import { AddressType, timestamps } from './columns.helpers';

export enum UserRoles {
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

export const UserRoleEnum = pgEnum('role', [UserRoles.MANAGER, UserRoles.DOCTOR, UserRoles.PHARMACIST, UserRoles.RECEPTIONIST, UserRoles.LAB_TECHNICIAN, UserRoles.BILLING]);
export const UserStatusEnum = pgEnum('status', [UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.SUSPENDED, UserStatus.LEAVE]);

export const usersTable = pgTable('users', (t) => ({
  id: t.serial('id').primaryKey(),
  firstName: t.text('first_name').notNull(),
  lastName: t.text('last_name').notNull(),
  email: t.text('email').notNull().unique(),
  username: t.text('username').notNull().unique(),
  password: t.text('password').notNull(),
  phoneNumber: t.text('phone_number'),
  lastLogin: t.timestamp('last_login'),
  status: UserStatusEnum().default(UserStatus.ACTIVE).notNull(),
  role: UserRoleEnum().default(UserRoles.PHARMACIST).notNull(),
  address: t.jsonb('address').$type<AddressType>(),
  salary: decimal('salary', { precision: 10, scale: 2 }).default('0').notNull(),
  ...timestamps,
}));
