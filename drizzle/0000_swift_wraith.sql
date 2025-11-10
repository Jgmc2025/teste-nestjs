CREATE TABLE "shopify_stores" (
	"shop_domain" text PRIMARY KEY NOT NULL,
	"access_token" text NOT NULL,
	"connected_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
