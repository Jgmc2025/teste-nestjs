import { Controller, Get, Post, Body, Headers, HttpCode, Logger } 
from '@nestjs/common';
import { AppService } from './app.service';

@Controller() 
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Post('/webhooks/orders/create') 
  @HttpCode(200)
  async handleOrderWebhook( 
    @Body() orderData: any,
    @Headers('x-shopify-shop-domain') shopDomain: string, ) {
    if (!shopDomain) { return; } 
    this.appService
      .saveCreatedOrder(shopDomain, orderData)
      .catch((err) => {
        this.logger.error('Erro ao salvar pedido (AppController):', err);
      }); 
      return { status: 'received' }; 
    }
  @Get() 
  getOrders() {
    return this.appService.getOrders();
  }
}