ALTER TABLE "orders" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "orders" CASCADE;--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP CONSTRAINT "shopify_stores_shopify_order_id_unique";--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "access_token" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "connected_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP COLUMN "shopify_order_id";--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP COLUMN "total_price";--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP COLUMN "customer_email";--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD CONSTRAINT "shopify_stores_shop_domain_unique" UNIQUE("shop_domain");