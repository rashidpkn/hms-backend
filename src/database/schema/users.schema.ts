import { pgTable, pgEnum, decimal } from 'drizzle-orm/pg-core';
import {
  AddressType,
  UserRoles,
  UserStatus,
  timestamps,
} from './columns.helpers';
import { companiesTable } from './company.schema';

export const UserRoleEnum = pgEnum('user_role', [
  UserRoles.ADMIN,
  UserRoles.MANAGER,
  UserRoles.DOCTOR,
  UserRoles.PHARMACIST,
  UserRoles.RECEPTIONIST,
  UserRoles.LAB_TECHNICIAN,
  UserRoles.BILLING,
]);
export const UserStatusEnum = pgEnum('user_status', [
  UserStatus.ACTIVE,
  UserStatus.INACTIVE,
  UserStatus.SUSPENDED,
  UserStatus.LEAVE,
]);

export const usersTable = pgTable('users', (t) => ({
  id: t.serial('id').primaryKey(),
  firstName: t.text('first_name').notNull(),
  lastName: t.text('last_name').notNull(),
  email: t.text('email').notNull().unique(),
  password: t.text('password').notNull(),
  lastLogin: t.timestamp('last_login'),
  status: UserStatusEnum().default(UserStatus.ACTIVE).notNull(),
  role: UserRoleEnum().default(UserRoles.PHARMACIST).notNull(),
  companyId: t
    .integer('company_id')
    .notNull()
    .references(() => companiesTable.id, { onDelete: 'restrict' }),
  refreshToken: t.text('refresh_token'),
  ...timestamps,
}));
