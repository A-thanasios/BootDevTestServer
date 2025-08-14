import { pgTable, timestamp, varchar, uuid, boolean } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    email: varchar("email", { length: 256 }).unique().notNull(),
    hashedPassword: varchar("hashed_password", { length: 256 }).notNull().default("unset"),
    isChirpyRed: boolean("is_chirpy_red").notNull().default(false),
});
export const chirps = pgTable("chirps", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    body: varchar("content", { length: 140 }).notNull(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
});
export const refreshTokens = pgTable("refreshTokens", {
    token: varchar("token", { length: 256 }).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    expiresAt: timestamp("expires_at").notNull().$defaultFn(() => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)),
    revokedAt: timestamp("revoked"),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
});
