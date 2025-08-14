import { and, asc, desc, eq } from "drizzle-orm";

import { db } from "../index.js";
import { chirps } from "../schema.js";

export async function createChirp(userId: string, body: string)
{
    const [result] = await db
        .insert(chirps)
        .values({userId, body})
        .onConflictDoNothing()
        .returning();
    return result;
}

export async function readChirp(chirpId: string, ascend: boolean= true): Promise<any>
{
    const [result] = await db
        .select()
        .from(chirps)
        .where(eq(chirps.id, chirpId))
        .orderBy(ascend ? asc(chirps.createdAt) : desc(chirps.createdAt));
    return result;
}

export async function readUserChirps(userID: string, ascend=true): Promise<any>
{
   return db
        .select()
        .from(chirps)
        .where(eq(chirps.userId, userID))
       .orderBy(ascend ? asc(chirps.createdAt) : desc(chirps.createdAt));
}

export async function readUserChirp(userID: string, chirpId: string, ascend=true): Promise<any>
{
    const [result] = await db
        .select()
        .from(chirps)
        .where(and(
            eq(chirps.id, chirpId),
            eq(chirps.userId, userID)))
        .orderBy(ascend ? asc(chirps.createdAt) : desc(chirps.createdAt));

    return result;
}

export async function readAllChirps(ascend: boolean= true): Promise<any[]>
{
    return db
        .select()
        .from(chirps)
        .orderBy(ascend ? asc(chirps.createdAt) : desc(chirps.createdAt));
}

export async function deleteChirp(id: string): Promise<void>
{
    await db
        .delete(chirps)
        .where(eq(chirps.id, id));
}