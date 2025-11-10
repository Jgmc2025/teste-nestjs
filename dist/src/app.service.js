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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const schema = __importStar(require("./db/schema"));
const drizzle_constants_1 = require("./drizzle/drizzle.constants");
const postgres_js_1 = require("drizzle-orm/postgres-js");
let AppService = AppService_1 = class AppService {
    db;
    logger = new common_1.Logger(AppService_1.name);
    cores = { RESET: '\x1b[0m', NEGRITO: '\x1b[1m',
        CINZA: '\x1b[90m' };
    constructor(db) {
        this.db = db;
    }
    async saveCreatedOrder(shopDomain, orderData) {
        const shopifyOrderId = orderData.admin_graphql_api_id || orderData.id.toString();
        const totalPrice = orderData.total_price;
        const customerEmail = orderData.customer?.email || 'N/A';
        const newOrder = await this.db
            .insert(schema.shopifyStores)
            .values({
            shopDomain: shopDomain,
            shopifyOrderId: shopifyOrderId,
            totalPrice: totalPrice,
            customerEmail: customerEmail
        })
            .onConflictDoNothing({ target: schema.shopifyStores.shopifyOrderId })
            .returning();
        if (newOrder.length > 0) {
            this.exibirNotificacaoBonita(newOrder[0]);
            return newOrder[0];
        }
        else {
            return { message: 'Pedido já existe' };
        }
    }
    async getOrders() {
        return await this.db.query.shopifyStores.findMany();
    }
    exibirNotificacaoBonita(pedido) {
        const { RESET, NEGRITO, CINZA } = this.cores;
        const valorFormatado = `R$ ${Number(pedido.totalPrice).toFixed(2)}`;
        const separador = CINZA + '--------------------------------------------' + RESET;
        const titulo = NEGRITO + ' NOVO PEDIDO NA LOJA! ' + RESET;
        const loja = `  ${NEGRITO} Loja:${RESET} ${pedido.shopDomain}`;
        const idPedido = `  ${NEGRITO} ID do Pedido:${RESET} ${pedido.shopifyOrderId}`;
        const valor = `  ${NEGRITO} Valor:${RESET} ${valorFormatado}`;
        console.log(['\n', titulo, separador, loja, idPedido,
            valor, separador, '\n'].join('\n'));
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(drizzle_constants_1.DB_CONNECTION)),
    __metadata("design:paramtypes", [postgres_js_1.PostgresJsDatabase])
], AppService);
//# sourceMappingURL=app.service.js.map