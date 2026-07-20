import { pgTable, jsonb, decimal } from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';
import { AddressType, timestamps } from './columns.helpers';
import { pgEnum } from 'drizzle-orm/pg-core';

export const workingDayEnum = pgEnum('working_day', [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]);

export const profilesTable = pgTable('profiles', (t) => ({
  id: t.serial('id').primaryKey(),

  userId: t
    .integer('user_id')
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    })
    .notNull()
    .unique(),

  joinedAt: t.timestamp('joined_at', {
    mode: 'date',
  }),

  endedAt: t.timestamp('ended_at', {
    mode: 'date',
  }),

  workingDays: workingDayEnum('working_days').array().notNull().default([]),

  leaveDates: jsonb('leave_dates')
    .$type<
      {
        date: string;
        reason?: string;
        approved?: boolean;
      }[]
    >()
    .notNull()
    .default([]),

  shiftStart: t.time('shift_start'),

  shiftEnd: t.time('shift_end'),
  phoneNumber: t.text('phone_number'),
  address: t.jsonb('address').$type<AddressType>(),
  salary: decimal('salary', { precision: 10, scale: 2 }).default('0').notNull(),
  profilePicture: t.text('profile_picture'),
  signature: t.text('signature'),
  department: t.text('department'),
  specialization: t.text('specialization'),
  qualifications: t.text('qualifications'),
  ...timestamps,
}));
