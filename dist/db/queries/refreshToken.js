import { db } from "../index.js";
import { refreshTokens } from "../schema.js";
import { eq } from "drizzle-orm";
export async function createRefreshToken(userId, token) {
    const [result] = await db
        .insert(refreshTokens)
        .values({
        userId,
        token: token,
    })
        .onConflictDoNothing()
        .returning();
    return result;
}
export async function readRefreshToken(token) {
    const [result] = await db
        .select()
        .from(refreshTokens)
        .where(eq(refreshTokens.token, token));
    return result;
}
export async function revokeRefreshToken(token) {
    const [result] = await db
        .update(refreshTokens)
        .set({ revokedAt: new Date() })
        .where(eq(refreshTokens.token, token));
    return result;
}
