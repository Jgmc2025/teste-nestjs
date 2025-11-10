"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.shopifyStores = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.shopifyStores = (0, pg_core_1.pgTable)('shopify_stores', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    shopDomain: (0, pg_core_1.text)('shop_domain').notNull(),
    shopifyOrderId: (0, pg_core_1.text)('shopify_order_id').notNull().unique(),
    totalPrice: (0, pg_core_1.text)('total_price'),
    customerEmail: (0, pg_core_1.text)('customer_email'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
exports.orders = (0, pg_core_1.pgTable)('orders', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    shopDomain: (0, pg_core_1.text)('shop_domain').notNull().unique(),
    accessToken: (0, pg_core_1.text)('access_token').notNull(),
    connectedAt: (0, pg_core_1.timestamp)('connected_at').defaultNow().notNull(),
});
//# sourceMappingURL=schema.js.map