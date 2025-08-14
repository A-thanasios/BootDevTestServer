import {Request, Response} from "express";
import {apiConfig} from "../config.js";
import { deleteUsers } from "../db/queries/users.js";
import process from "node:process";

export async function handlerReset(req: Request, res: Response): Promise<void>
{
    if (apiConfig.platform === "dev")
    {
        apiConfig.fileserverHits = 0;
        await deleteUsers();
        res.send("OK");
    }
    else res.status(403).send("Forbidden: Reset is only allowed in development mode.");
}