import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { shopifyApi } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
type ShopifyApi = ReturnType<typeof shopifyApi>;
export declare class ShopifyService implements OnModuleInit {
    private configService;
    private shopify;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    getClient(): ShopifyApi;
}
export {};
