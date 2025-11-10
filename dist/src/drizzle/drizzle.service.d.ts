import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../db/schema';
export declare class DrizzleService {
    readonly db: PostgresJsDatabase<typeof schema>;
    constructor(db: PostgresJsDatabase<typeof schema>);
}
