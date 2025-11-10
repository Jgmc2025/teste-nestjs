import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DB_CONNECTION } from './drizzle/drizzle.constants';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './db/schema';

@Module({ 
  imports: 
  [ ConfigModule.forRoot({ isGlobal: true }) ],
  controllers: [AppController],
  providers: [ AppService, {
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        if (!connectionString) {
          throw new Error('DATABASE_URL não foi definida no .env');
        } 
        const client = postgres(connectionString);
        return drizzle(client, { schema }); 
      },
    }, 
  ], 
}) 
export class AppModule {}