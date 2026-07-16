
import { drizzle } from 'drizzle-orm/node-postgres';
import configuration from 'src/config/configuration';

const db = drizzle(configuration().databaseUrl);

export type DB = typeof db;

export default db;