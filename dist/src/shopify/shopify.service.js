"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const shopify_api_1 = require("@shopify/shopify-api");
require("@shopify/shopify-api/adapters/node");
let ShopifyService = class ShopifyService {
    configService;
    shopify;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const apiKey = this.configService.getOrThrow('SHOPIFY_API_KEY');
        const apiSecret = this.configService.getOrThrow('SHOPIFY_API_SECRET');
        const scopes = this.configService.getOrThrow('SHOPIFY_SCOPES');
        const host = this.configService.getOrThrow('HOST');
        const apiVersion = this.configService.getOrThrow('SHOPIFY_API_VERSION');
        const hostUrl = new URL(host);
        this.shopify = (0, shopify_api_1.shopifyApi)({
            apiKey,
            apiSecretKey: apiSecret,
            scopes: scopes.split(','),
            hostName: hostUrl.hostname,
            hostScheme: hostUrl.protocol.replace(':', ''),
            apiVersion: apiVersion,
            isEmbeddedApp: true,
            future: {
                customerAddressDefaultFix: true,
                unstable_managedPricingSupport: true,
            }, logger: { level: shopify_api_1.LogSeverity.Debug },
        });
    }
    getClient() { return this.shopify; }
};
exports.ShopifyService = ShopifyService;
exports.ShopifyService = ShopifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ShopifyService);
//# sourceMappingURL=shopify.service.js.map