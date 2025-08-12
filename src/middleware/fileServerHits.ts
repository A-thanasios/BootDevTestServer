import {NextFunction, Request, Response} from 'express';

import { apiConfig } from "../config.js";

export function MetricsInc(req: Request, res: Response, next: NextFunction)
    {
        if (req.url.endsWith("/metrics") || req.url.endsWith("/reset"))
        {
            next();
        }
        else
        {
            apiConfig.fileserverHits++;
            next();
        }
    }
