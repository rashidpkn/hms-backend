ALTER TABLE "patients" ALTER COLUMN "patient_code" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "patients" ALTER COLUMN "date_of_birth" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "patients" ADD COLUMN "created_by" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;