CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"shop_domain" text NOT NULL,
	"access_token" text NOT NULL,
	"connected_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orders_shop_domain_unique" UNIQUE("shop_domain")
);
--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP CONSTRAINT "shopify_stores_shop_domain_unique";--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "shopify_order_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "total_price" text;--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "customer_email" text;--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP COLUMN "access_token";--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP COLUMN "connected_at";--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD CONSTRAINT "shopify_stores_shopify_order_id_unique" UNIQUE("shopify_order_id");