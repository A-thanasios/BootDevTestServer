import {Request, Response} from "express";
import {apiConfig} from "../config.js";

export function handlerReset(req: Request, res: Response): void
{
    apiConfig.fileserverHits = 0;
    res.send("OK");
}