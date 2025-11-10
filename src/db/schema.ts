import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const shopifyStores = pgTable('shopify_stores', {
  id: serial('id').primaryKey(),
  shopDomain: text('shop_domain').notNull(), 
  shopifyOrderId: text('shopify_order_id').notNull().unique(), 
  totalPrice: text('total_price'), 
  customerEmail: text('customer_email'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  shopDomain: text('shop_domain').notNull().unique(),
  accessToken: text('access_token').notNull(),
  connectedAt: timestamp('connected_at').defaultNow().notNull(),
});