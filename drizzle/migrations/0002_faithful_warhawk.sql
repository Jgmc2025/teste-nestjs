/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'orders'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "orders" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "shopify_order_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total_price" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "customer_email" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "processed_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "access_token";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "connected_at";