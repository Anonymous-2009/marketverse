import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DOCKER_DATABASE_URL!);
// export const db = drizzle(process.env.DATABASE_URL!);
