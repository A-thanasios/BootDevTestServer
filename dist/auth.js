import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
export async function checkPasswordHash(password, hash) {
    return bcrypt.compare(password, hash);
}
export function validateJWT(tokenString, secret) {
    try {
        const payload = jwt.verify(tokenString, secret);
        return payload.sub;
    }
    catch (error) {
        return undefined;
    }
}
export function getBearerToken(req) {
    const token = req.get('authorization');
    if (token) {
        return token.split(' ')[1];
    }
    else
        return "";
}
export function makeRefreshToken() {
    return randomBytes(32).toString("hex");
}
export function getAPIKey(req) {
    const apiKey = req.get('authorization');
    if (apiKey) {
        return apiKey.split(' ')[1];
    }
    else
        return "";
}
