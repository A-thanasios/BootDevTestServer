import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../../../auth.js";
import { apiConfig } from "../../../config.js";
import { updateUser } from "../../../db/queries/users.js";

export async function handleUpdateUser(req: Request, res: Response)
{
    const token = getBearerToken(req);
    const userId = validateJWT(token, apiConfig.secret);

    if (!userId)
    {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const { email, password } = req.body;
    const updatedUser = await updateUser(userId, email, password);

    res.status(200).json(updatedUser);
}