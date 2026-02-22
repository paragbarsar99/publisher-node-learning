import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
//postgres://username:password@host:port/dbname
const db = drizzle(process.env.DATABASE_URL!);
export default db