import * as process from "node:process";
process.loadEnvFile(".env");
function getEnvVal(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}
export const migrationConfig = {
    migrationsFolder: "src/db/",
};
export const apiConfig = {
    fileserverHits: 0,
    platform: getEnvVal("PLATFORM"),
    secret: getEnvVal("SECRET_KEY"),
    apiKey: getEnvVal("API_KEY"),
    db: { url: getEnvVal("DB_URL"), migrationConfig },
};
