import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "./schema.js";
import { apiConfig } from "../config.js";
const conn = postgres(apiConfig.db.url);
const migrationClient = postgres(apiConfig.db.url, { max: 1 });
await migrate(drizzle(migrationClient), apiConfig.db.migrationConfig);
export const db = drizzle(conn, { schema });
