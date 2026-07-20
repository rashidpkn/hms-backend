ALTER TABLE "companies" RENAME COLUMN "status" TO "company_status";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "status" TO "user_status";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "role" TO "user_role";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "tenant_id" TO "company_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "username";