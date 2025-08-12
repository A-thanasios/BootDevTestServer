import { defineConfig } from "drizzle-kit";
import { apiConfig } from "./src/config";

export default defineConfig({
    schema: "src/db/schema.ts",
    out: "src/db",
    dialect: "postgresql",
    dbCredentials: {
        url: apiConfig.db.url,
    },
});