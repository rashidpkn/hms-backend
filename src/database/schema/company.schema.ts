import { pgEnum, pgTable } from 'drizzle-orm/pg-core';
import { AddressType, CompanyStatus, timestamps } from './columns.helpers';
import { sql } from 'drizzle-orm';
import { decimal } from 'drizzle-orm/pg-core';

export const CompanyStatusEnum = pgEnum('company_status', CompanyStatus);

export const companiesTable = pgTable('companies', (t) => ({
  id: t.serial('id').primaryKey(),
  name: t.text('name').notNull().unique(),
  email: t.text('email').notNull().unique(),
  phoneNumber: t.text('phone_number').notNull().unique(),
  email2: t.text('email2').unique(),
  phoneNumber2: t.text('phone_number2').unique(),
  address: t.jsonb('address').$type<AddressType>(),
  licenseNumber: t.text('license_number').unique(),
  status: CompanyStatusEnum().default(CompanyStatus.ACTIVE).notNull(),
  yearlySubscriptionAmount: decimal('yearly_subscription_amount', {
    precision: 10,
    scale: 2,
  })
    .default('0')
    .notNull(),
  expiredAt: t
    .timestamp('expired_at')
    .notNull()
    .default(sql`(NOW() + INTERVAL '1 year')`),
  logo: t.text('logo'),
  ...timestamps,
}));
