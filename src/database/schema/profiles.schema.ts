import { pgTable, jsonb } from 'drizzle-orm/pg-core';
import { usersTable } from './users.schema';
import { timestamps, workingDayEnum } from './columns.helpers';

export const profilesTable = pgTable('profiles', (t) => ({
  id: t.serial('id').primaryKey(),

  userId: t
    .integer('user_id')
    .references(() => usersTable.id, {
      onDelete: 'restrict',
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

  ...timestamps,
}));
