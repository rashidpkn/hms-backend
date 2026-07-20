CREATE TYPE "public"."blood_group" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('Male', 'Female', 'Unknown');--> statement-breakpoint
CREATE TYPE "public"."patient_status" AS ENUM('ACTIVE', 'INACTIVE', 'DECEASED');--> statement-breakpoint
CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"patient_code" varchar(20) NOT NULL,
	"email" text,
	"phone_number" text,
	"address" jsonb,
	"primary_doctor_id" integer,
	"date_of_birth" date,
	"gender" "gender" DEFAULT 'Unknown' NOT NULL,
	"blood_group" "blood_group",
	"allergies" jsonb,
	"emergency_contact" jsonb,
	"insurance_details" jsonb,
	"notes" text,
	"status" "patient_status" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "patients_patient_code_unique" UNIQUE("patient_code")
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "profile_picture" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "signature" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "department" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "specialization" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "qualifications" text;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_primary_doctor_id_users_id_fk" FOREIGN KEY ("primary_doctor_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;