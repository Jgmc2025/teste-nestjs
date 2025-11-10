import { Controller, Get, Req, Res, BadRequestException, Inject } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ShopifyService } from '../shopify/shopify.service';
import { Shopify } from '@shopify/shopify-api';
import { DB_CONNECTION } from '../drizzle/drizzle.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema'; 

@Controller('auth')
export class AuthController {
  constructor(
    private shopifyService: ShopifyService,
    @Inject(DB_CONNECTION)
    private db: PostgresJsDatabase<typeof schema>,
  ) {}
  @Get()
  async beginAuth(@Req() req: Request, @Res() res: Response) {
    const shopify = this.shopifyService.getClient();
    const shopQuery = req.query.shop;
    if (!shopQuery || typeof shopQuery !== 'string') {
      throw new BadRequestException('Parâmetro "shop" ausente ou inválido');
    }
    const sanitizedShop = shopify.utils.sanitizeShop(shopQuery);
    if (!sanitizedShop) {
      throw new BadRequestException('Nome da loja inválido ou mal formatado');
    }
    await shopify.auth.begin({
      shop: sanitizedShop,
      callbackPath: '/auth/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  }
  @Get('callback')
  async authCallback(@Req() req: Request, @Res() res: Response) {
    const shopify: Shopify = this.shopifyService.getClient();
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
}