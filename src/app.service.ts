import { Inject, Injectable, Logger } from '@nestjs/common';
import * as schema from './db/schema';
import { DB_CONNECTION } from './drizzle/drizzle.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

type NovoPedido = typeof schema.shopifyStores.$inferInsert;

@Injectable() 
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly cores = { RESET: '\x1b[0m', NEGRITO: '\x1b[1m',
     CINZA: '\x1b[90m' };
  constructor( @Inject(DB_CONNECTION)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}
  async saveCreatedOrder(shopDomain: string, orderData: any) {
    const shopifyOrderId =
      orderData.admin_graphql_api_id || orderData.id.toString();
    const totalPrice = orderData.total_price;
    const customerEmail = orderData.customer?.email || 'N/A';
    const newOrder = await this.db
      .insert(schema.shopifyStores)
      .values({
        shopDomain: shopDomain,
        shopifyOrderId: shopifyOrderId,
        totalPrice: totalPrice,
        customerEmail: customerEmail })
      .onConflictDoNothing({ target: schema.shopifyStores.shopifyOrderId })
      .returning();
    if (newOrder.length > 0) {
      this.exibirNotificacaoBonita(newOrder[0]);
      return newOrder[0];
    } else { return { message: 'Pedido já existe' }; }
  }
  async getOrders() {
    return await this.db.query.shopifyStores.findMany();
  }
  private exibirNotificacaoBonita(pedido: NovoPedido): void {
    const { RESET, NEGRITO, CINZA } = this.cores;
    const valorFormatado = `R$ ${Number(pedido.totalPrice).toFixed(2)}`;
    const separador = 
    CINZA + '--------------------------------------------' + RESET;
    const titulo = NEGRITO + ' NOVO PEDIDO NA LOJA! ' + RESET;
    const loja = `  ${NEGRITO} Loja:${RESET} ${pedido.shopDomain}`;
    const idPedido = 
    `  ${NEGRITO} ID do Pedido:${RESET} ${pedido.shopifyOrderId}`;
    const valor = `  ${NEGRITO} Valor:${RESET} ${valorFormatado}`;
    console.log([ '\n', titulo, separador, loja, idPedido, 
        valor, separador,'\n' ].join('\n'),
    );
  }
}