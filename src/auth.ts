import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Request } from "express";
import { randomBytes } from "crypto";

export async function hashPassword(password: string): Promise<string>
    {
        return bcrypt.hash(password, 10)
    }

export async function checkPasswordHash(password: string, hash: string): Promise<boolean>
    {
        return bcrypt.compare(password, hash);
    }

export function validateJWT(tokenString: string, secret: string): string | undefined
    {
        try
        {
            const payload = jwt.verify(tokenString, secret);
            return payload.sub as string;
        } catch (error)
        {
            return undefined;
        }
    }

export function getBearerToken(req: Request): string
{
    const token = req.get('authorization');

    if (token)
    {
        return token.split(' ')[1];
    }
    else return "";
}

export function makeRefreshToken()
    {
        return randomBytes(32).toString("hex");
    }

export function getAPIKey(req: Request): string
    {
        const apiKey = req.get('authorization');

        if (apiKey) {return apiKey.split(' ')[1];}
        else return "";

    }