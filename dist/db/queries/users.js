import { db } from "../index.js";
import { users } from "../schema.js";
import { eq } from "drizzle-orm";
import { checkPasswordHash, hashPassword } from "../../auth.js";
export async function createUser(email, password) {
    const [result] = await db
        .insert(users)
        .values({ email, hashedPassword: await hashPassword(password) })
        .onConflictDoNothing()
        .returning();
    if (!result) {
        throw new Error("User already exists or invalid data");
    }
    const { hashedPassword, ...userWithoutPassword } = result;
    return userWithoutPassword;
}
export async function readUserByEmail(email, password) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
    if (user && await checkPasswordHash(password, user.hashedPassword)) {
        const { hashedPassword, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
export async function updateUser(id, email, password) {
    const hashedPassword = await hashPassword(password);
    const [result] = await db
        .update(users)
        .set({ email, hashedPassword })
        .where(eq(users.id, id))
        .returning();
    if (!result) {
        throw new Error("User not found or invalid data");
    }
    const { hashedPassword: _, ...userWithoutPassword } = result;
    return userWithoutPassword;
}
export async function updateUserChirpyRed(id) {
    const [result] = await db
        .update(users)
        .set({ isChirpyRed: true })
        .where(eq(users.id, id))
        .returning();
    return !!result;
}
export async function deleteUsers() {
    await db.delete(users);
}
