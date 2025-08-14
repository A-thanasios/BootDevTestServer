import { getBearerToken } from "../../../auth.js";
import { Request, Response } from "express";
import { readRefreshToken } from "../../../db/queries/refreshToken.js";
import { makeJWT } from "../../../jwt.js";
import { apiConfig } from "../../../config.js";

export async function handleRefresh(req: Request, res: Response)
{
    const token = getBearerToken(req);

    const refreshToken = await readRefreshToken(token);

    if (refreshToken && refreshToken.expiresAt > new Date() && !refreshToken.revokedAt)
    {
        const newToken = makeJWT(refreshToken.userId, 3600, apiConfig.secret)
        res.status(200).json({token: newToken});
    }
    else
    {
        console.log(refreshToken);
        res.status(401).json({ error: "Unauthorized" });
    }
}