ALTER TYPE "public"."appointment_type" ADD VALUE 'Walk_in';--> statement-breakpoint
ALTER TYPE "public"."appointment_type" ADD VALUE 'Booked';--> statement-breakpoint
ALTER TYPE "public"."appointment_type" ADD VALUE 'Referral';--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "company_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "height" numeric(5, 2);--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "weight" numeric(5, 2);--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "years_of_experience" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_changed_at" timestamp;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;