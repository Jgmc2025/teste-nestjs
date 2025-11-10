ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "shopify_order_id" TO "access_token";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "total_price" TO "connected_at";--> statement-breakpoint
ALTER TABLE "shopify_stores" RENAME COLUMN "access_token" TO "shopify_order_id";--> statement-breakpoint
ALTER TABLE "shopify_stores" RENAME COLUMN "connected_at" TO "total_price";--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_shopify_order_id_unique";--> statement-breakpoint
ALTER TABLE "shopify_stores" DROP CONSTRAINT "shopify_stores_shop_domain_unique";--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "customer_email" text;--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "customer_email";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_shop_domain_unique" UNIQUE("shop_domain");--> statement-breakpoint
ALTER TABLE "shopify_stores" ADD CONSTRAINT "shopify_stores_shopify_order_id_unique" UNIQUE("shopify_order_id");