import * as process from "node:process";
import { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile(".env");

function getEnvVal(key: string): string
{
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}

type APIConfig =
    {
        fileserverHits: number,
        db: DBConfig
    };

type DBConfig =
    {
        url: string,
        migrationConfig: MigrationConfig
    };

export const migrationConfig =
    {
        migrationsFolder: "src/db/migrations/",
    };

export const apiConfig: APIConfig =
    {
        fileserverHits: 0,
        db: { url: getEnvVal("DB_URL"), migrationConfig },
    };