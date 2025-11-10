import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
import { DB_CONNECTION } from './drizzle.constants'; 

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DB_CONNECTION)
    public readonly db: PostgresJsDatabase<typeof schema>,) {} 
  }