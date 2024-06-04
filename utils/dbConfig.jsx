import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon("postgresql://Expense-Tracker_owner:PCpSX7HU3hqE@ep-damp-poetry-a5fp2zfu.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require");
export const db = drizzle(sql,{schema});

export default db;