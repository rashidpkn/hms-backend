CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'LEAVE');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('MANAGER', 'DOCTOR', 'PHARMACIST', 'RECEPTIONIST', 'LAB_TECHNICIAN', 'BILLING');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"email2" text,
	"phone_number2" text,
	"address" jsonb,
	"license_number" text,
	"status" "status" DEFAULT 'ACTIVE' NOT NULL,
	"yearly_subscription_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"expired_at" timestamp DEFAULT (NOW() + INTERVAL '1 year') NOT NULL,
	"logo" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "companies_email_unique" UNIQUE("email"),
	CONSTRAINT "companies_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "companies_email2_unique" UNIQUE("email2"),
	CONSTRAINT "companies_phone_number2_unique" UNIQUE("phone_number2")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"phone_number" text,
	"last_login" timestamp,
	"status" "status" DEFAULT 'ACTIVE' NOT NULL,
	"role" "role" DEFAULT 'PHARMACIST' NOT NULL,
	"address" jsonb,
	"salary" numeric(10, 2) DEFAULT '0' NOT NULL,
	"tenant_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_companies_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;