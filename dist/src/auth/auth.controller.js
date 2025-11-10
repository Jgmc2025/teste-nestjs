"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const shopify_service_1 = require("../shopify/shopify.service");
const drizzle_constants_1 = require("../drizzle/drizzle.constants");
const postgres_js_1 = require("drizzle-orm/postgres-js");
const schema = __importStar(require("../db/schema"));
let AuthController = class AuthController {
    shopifyService;
    db;
    constructor(shopifyService, db) {
        this.shopifyService = shopifyService;
        this.db = db;
    }
    async beginAuth(req, res) {
        const shopify = this.shopifyService.getClient();
        const shopQuery = req.query.shop;
        if (!shopQuery || typeof shopQuery !== 'string') {
            throw new common_1.BadRequestException('Parâmetro "shop" ausente ou inválido');
        }
        const sanitizedShop = shopify.utils.sanitizeShop(shopQuery);
        if (!sanitizedShop) {
            throw new common_1.BadRequestException('Nome da loja inválido ou mal formatado');
        }
        await shopify.auth.begin({
            shop: sanitizedShop,
            callbackPath: '/auth/callback',
            isOnline: false,
            rawRequest: req,
            rawResponse: res,
        });
    }
    async authCallback(req, res) {
        const shopify = this.shopifyService.getClient();
        let sessionResponse;
        sessionResponse = await shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });
        const { session } = sessionResponse;
        const { shop, accessToken } = session;
        await this.db
            .insert(schema.orders)
            .values({
            shopDomain: shop,
            accessToken: accessToken,
        })
            .onConflictDoUpdate({
            target: schema.orders.shopDomain,
            set: {
                accessToken: accessToken,
            },
        });
        return res.redirect(`/?shop=${shop}&host=${req.query.host}`);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "beginAuth", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __param(1, (0, common_1.Inject)(drizzle_constants_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [shopify_service_1.ShopifyService,
        postgres_js_1.PostgresJsDatabase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map