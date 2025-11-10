import type { Request, Response } from 'express';
import { ShopifyService } from '../shopify/shopify.service';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
export declare class AuthController {
    private shopifyService;
    private db;
    constructor(shopifyService: ShopifyService, db: PostgresJsDatabase<typeof schema>);
    beginAuth(req: Request, res: Response): Promise<void>;
    authCallback(req: Request, res: Response): Promise<void>;
}
