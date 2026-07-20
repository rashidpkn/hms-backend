CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"joined_at" timestamp,
	"ended_at" timestamp,
	"working_days" "working_day"[] DEFAULT '{}' NOT NULL,
	"leave_dates" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"shift_start" time,
	"shift_end" time,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_license_number_unique" UNIQUE("license_number");