CREATE TYPE "public"."appointment_medium" AS ENUM('Online', 'Offline');--> statement-breakpoint
CREATE TYPE "public"."appointment_status" AS ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed', 'Rescheduled', 'No Show');--> statement-breakpoint
CREATE TYPE "public"."appointment_type" AS ENUM('General', 'Follow_up', 'Emergency');