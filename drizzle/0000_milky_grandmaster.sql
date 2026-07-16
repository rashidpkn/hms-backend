CREATE TYPE "public"."user_role" AS ENUM('MANAGER', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'LAB_TECHNICIAN', 'BILLING');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"last_login" timestamp,
	"status" "user_status" DEFAULT 'ACTIVE' NOT NULL,
	"role" "user_role" DEFAULT 'PHARMACIST' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
