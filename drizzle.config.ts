import type { Config } from "drizzle-kit";

export default {
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    driver: "expo",
    dbCredentials: {
        url: "trable.db"
    },
    dialect: "sqlite"
} satisfies Config;
