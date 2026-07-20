CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'LEAVE');--> statement-breakpoint
ALTER TYPE "public"."status" RENAME TO "company_status";--> statement-breakpoint
ALTER TYPE "public"."role" RENAME TO "user_role";--> statement-breakpoint
ALTER TABLE "companies" RENAME COLUMN "company_status" TO "status";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "user_status" TO "status";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "user_role" TO "role";--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'::text;--> statement-breakpoint
DROP TYPE "public"."company_status";--> statement-breakpoint
CREATE TYPE "public"."company_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED');--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'::"public"."company_status";--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "status" SET DATA TYPE "public"."company_status" USING "status"::"public"."company_status";