import { Request, Response } from "express";
import { apiConfig } from "../config.js";

export function handlerReqNm(req: Request, res: Response): void
    {
        res.send(`Hits: ${apiConfig.fileserverHits}`)
    }