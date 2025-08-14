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
        platform: string,
        secret: string,
        apiKey: string,
        db: DBConfig
    };

type DBConfig =
    {
        url: string,
        migrationConfig: MigrationConfig
    };

export const migrationConfig =
    {
        migrationsFolder: "src/db/",
    };

export const apiConfig: APIConfig =
    {
        fileserverHits: 0,
        platform: getEnvVal("PLATFORM"),
        secret: getEnvVal("SECRET_KEY"),
        apiKey: getEnvVal("API_KEY"),
        db: { url: getEnvVal("DB_URL"), migrationConfig },
    };