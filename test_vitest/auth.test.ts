import { describe, it, expect, beforeAll } from "vitest";

import { checkPasswordHash, hashPassword, validateJWT } from "../src/auth.js";
import { makeJWT } from "../src/jwt.js";

describe("Password Hashing", () => {
    const password1 = "correctPassword123!";
    const password2 = "anotherPassword456!";

    let hash1: string;
    let hash2: string;

    const secret = "secretKey";

    const userId1 = "user1";

    let token1: string;

    beforeAll(async () => {
        hash1 = await hashPassword(password1);
        hash2 = await hashPassword(password2);

        token1 = makeJWT(userId1, 5, secret);
    });

    it("should return true for the correct password", async () => {
        const result = await checkPasswordHash(password1, hash1);
        expect(result).toBe(true);
    });

    it("should return user id for the correct jwt token", async () => {
        const result = validateJWT(token1, secret);
        expect(result).toBe(userId1);
    })
});