import { Request, Response } from "express";
import { updateUserChirpyRed } from "../../../db/queries/users.js";
import { getAPIKey } from "../../../auth.js";
import { apiConfig } from "../../../config.js";

export async function handleWebhook(req: Request, res: Response)
{
    const apikey = getAPIKey(req);
    if (apikey !== apiConfig.apiKey) {res.status(401).end(); return;}
    const event = req.body.event;
    const userId = req.body.data.userId;

    if (event === "user.upgraded")
    {
        if (await updateUserChirpyRed(userId)) { res.status(204).end();}
        else { res.status(404).end();}
    }
    else { res.status(204).end();}
}