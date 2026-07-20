CREATE TYPE "public"."company_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TYPE "public"."blood_group" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('Male', 'Female', 'Unknown');--> statement-breakpoint
CREATE TYPE "public"."patient_status" AS ENUM('ACTIVE', 'INACTIVE', 'DECEASED');--> statement-breakpoint
CREATE TYPE "public"."working_day" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'MANAGER', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'LAB_TECHNICIAN', 'BILLING');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'LEAVE');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"email2" text,
	"phone_number2" text,
	"address" jsonb,
	"license_number" text,
	"status" "company_status" DEFAULT 'ACTIVE' NOT NULL,
	"yearly_subscription_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"expired_at" timestamp DEFAULT (NOW() + INTERVAL '1 year') NOT NULL,
	"logo" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "companies_name_unique" UNIQUE("name"),
	CONSTRAINT "companies_email_unique" UNIQUE("email"),
	CONSTRAINT "companies_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "companies_email2_unique" UNIQUE("email2"),
	CONSTRAINT "companies_phone_number2_unique" UNIQUE("phone_number2"),
	CONSTRAINT "companies_license_number_unique" UNIQUE("license_number")
);
--> statement-breakpoint
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
CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"joined_at" timestamp,
	"ended_at" timestamp,
	"working_days" "working_day"[] DEFAULT '{}' NOT NULL,
	"leave_dates" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"shift_start" time,
	"shift_end" time,
	"phone_number" text,
	"address" jsonb,
	"salary" numeric(10, 2) DEFAULT '0' NOT NULL,
	"profile_picture" text,
	"signature" text,
	"department" text,
	"specialization" text,
	"qualifications" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"last_login" timestamp,
	"status" "user_status" DEFAULT 'ACTIVE' NOT NULL,
	"role" "user_role" DEFAULT 'PHARMACIST' NOT NULL,
	"company_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_primary_doctor_id_users_id_fk" FOREIGN KEY ("primary_doctor_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;