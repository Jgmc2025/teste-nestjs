CREATE TABLE "orders" (
	"shop_domain" text PRIMARY KEY NOT NULL,
	"access_token" text NOT NULL,
	"connected_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP COLUMN "updated_at";