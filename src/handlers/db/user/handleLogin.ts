import { Request, Response } from "express";
import { readUserByEmail } from "../../../db/queries/users.js";
import { makeJWT } from "../../../jwt.js";
import { apiConfig } from "../../../config.js";
import { createRefreshToken } from "../../../db/queries/refreshToken.js";
import { makeRefreshToken } from "../../../auth.js";
import { RefreshToken } from "../../../db/schema.js";

export async function handleLogin(req: Request, res: Response)
    {
        const { email, password, expiresInSeconds } = req.body;

        const user = await readUserByEmail(email, password);
        if (user)
        {

            const accessToken = makeJWT(user.id as string,
                expiresInSeconds || expiresInSeconds > 3600 ? expiresInSeconds : 3600,
                apiConfig.secret)
            const refreshToken = await createRefreshToken(user.id as string, makeRefreshToken())

            res.status(200).json({
                ...user,
                token: accessToken,
                refreshToken: refreshToken.token
            });
        }
        else
        {
            res.status(401).json({ error: "Unauthorized" });
        }
    }