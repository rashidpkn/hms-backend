import { defineConfig } from 'drizzle-kit';
import configuration from 'src/config/configuration';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/database/schema/**/*.schema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: configuration().databaseUrl,
  },
});