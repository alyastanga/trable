import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    displayName: text("display_name").notNull()
});

export const accounts = sqliteTable("accounts", {
    id: integer("id").primaryKey({ autoIncrement: true })
});
