-- This keeps your database structure in version control, in sync with your code, and reproducible — anyone who clones the repo and runs the migrations ends up with an identical database structure.

CREATE SCHEMA "catalog";
--> statement-breakpoint
CREATE TYPE "catalog"."badge" AS ENUM('Ready to ship', 'New');--> statement-breakpoint
CREATE TYPE "catalog"."category" AS ENUM('women', 'men', 'kids', 'jewellery');--> statement-breakpoint
CREATE TABLE "catalog"."products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" "catalog"."category" NOT NULL,
	"category_label" text NOT NULL,
	"name" text NOT NULL,
	"price_in_paise" integer NOT NULL,
	"shipping_text" text NOT NULL,
	"badge" "catalog"."badge",
	"placeholder_gradient" text NOT NULL,
	"placeholder_label" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
