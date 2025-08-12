import * as process from "node:process";
process.loadEnvFile();
export const apiConfig = {
    fileserverHits: 0,
    dbURL: process.env.DB_URL,
};
