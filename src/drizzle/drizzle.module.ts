import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';
import { DB_CONNECTION } from './drizzle.constants';

@Module({
  imports: [ConfigModule],
  providers: [{
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL não definida nas variáveis de ambiente');}
        const client = postgres(connectionString);
        return drizzle(client, { schema });
      }, 
    }, 
  ], exports: [DB_CONNECTION] 
})
export class DrizzleModule {}