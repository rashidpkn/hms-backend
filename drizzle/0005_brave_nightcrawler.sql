ALTER TABLE "appointments" ADD COLUMN "patient_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "doctor_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "appointment_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "appointment_time" time NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "appointment_medium" "appointment_medium" DEFAULT 'Offline' NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "appointment_type" "appointment_type" DEFAULT 'General' NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "status" "appointment_status" DEFAULT 'Pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "is_deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_users_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;