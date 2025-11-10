import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { shopifyApi, LogSeverity, ApiVersion } 
from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';

type ShopifyApi = ReturnType<typeof shopifyApi>;

@Injectable()
export class ShopifyService implements OnModuleInit {
  private shopify: ShopifyApi;
  constructor(private configService: ConfigService) {}
  onModuleInit() {
    const apiKey = 
    this.configService.getOrThrow<string>('SHOPIFY_API_KEY');
    const apiSecret = 
    this.configService.getOrThrow<string>('SHOPIFY_API_SECRET');
    const scopes = 
    this.configService.getOrThrow<string>('SHOPIFY_SCOPES');
    const host = 
    this.configService.getOrThrow<string>('HOST');
    const apiVersion = 
    this.configService.getOrThrow('SHOPIFY_API_VERSION') as ApiVersion;
    const hostUrl = new URL(host);
    this.shopify = shopifyApi({
      apiKey,
      apiSecretKey: apiSecret,
      scopes: scopes.split(','),
      hostName: hostUrl.hostname,
      hostScheme: hostUrl.protocol.replace(':', '') as 'http' | 'https',
      apiVersion: apiVersion,
      isEmbeddedApp: true,
      future: {
        customerAddressDefaultFix: true,
        unstable_managedPricingSupport: true,
      }, logger: { level: LogSeverity.Debug },
    });
  } 
  getClient(): ShopifyApi { return this.shopify; }
}