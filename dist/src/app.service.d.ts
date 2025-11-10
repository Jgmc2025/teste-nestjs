import * as schema from './db/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
export declare class AppService {
    private db;
    private readonly logger;
    private readonly cores;
    constructor(db: PostgresJsDatabase<typeof schema>);
    saveCreatedOrder(shopDomain: string, orderData: any): Promise<{
        id: number;
        shopDomain: string;
        shopifyOrderId: string;
        totalPrice: string | null;
        customerEmail: string | null;
        createdAt: Date;
    } | {
        message: string;
    }>;
    getOrders(): Promise<{
        id: number;
        shopDomain: string;
        shopifyOrderId: string;
        totalPrice: string | null;
        customerEmail: string | null;
        createdAt: Date;
    }[]>;
    private exibirNotificacaoBonita;
}
