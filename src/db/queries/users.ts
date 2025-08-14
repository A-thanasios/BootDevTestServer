import { db } from "../index.js";
import { User, users } from "../schema.js";
import { eq } from "drizzle-orm";
import { checkPasswordHash, hashPassword } from "../../auth.js";


export async function createUser(email: string, password: string)
    {
        const [result] = await db
            .insert(users)
            .values({email, hashedPassword: await hashPassword(password)})
            .onConflictDoNothing()
            .returning();
        if (!result)
        {
            throw new Error("User already exists or invalid data");
        }
        const { hashedPassword, ...userWithoutPassword } = result;
        return userWithoutPassword as Omit<User, 'hashedPassword'>;
    }

export async function readUserByEmail(email: string, password: string)
    {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));

        if (user && await checkPasswordHash(password, user.hashedPassword))
        {
            const { hashedPassword, ...userWithoutPassword } = user;
            return userWithoutPassword as Omit<User, 'hashedPassword'>;
        }
    }

export async function updateUser(id: string, email: string, password: string)
{
    const hashedPassword = await hashPassword(password);
    const [result] = await db
        .update(users)
        .set({ email, hashedPassword })
        .where(eq(users.id, id))
        .returning();
    if (!result)
    {
        throw new Error("User not found or invalid data");
    }
    const { hashedPassword: _, ...userWithoutPassword } = result;
    return userWithoutPassword as Omit<User, 'hashedPassword'>;
}

export async function updateUserChirpyRed(id: string)
{
    const [result] = await db
        .update(users)
        .set({ isChirpyRed: true })
        .where(eq(users.id, id))
        .returning();

    return !!result;
}


export async function deleteUsers(): Promise<void>
    {
        await db.delete(users);
    }