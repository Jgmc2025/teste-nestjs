import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ShopifyModule } from '../shopify/shopify.module';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({ 
  imports: [
    ShopifyModule, 
    DrizzleModule
  ], 
  controllers: [AuthController],
  providers: [],
}) 
export class AuthModule {}