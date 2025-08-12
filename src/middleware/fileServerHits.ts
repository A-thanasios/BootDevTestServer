import {NextFunction, Request, Response} from 'express';

import { apiConfig } from "../config.js";

export function MetricsInc(req: Request, res: Response, next: NextFunction)
    {
        if (req.url.startsWith("/app"))
        {
            apiConfig.fileserverHits++;
            next();
        }
        else
        {
            next();
        }
    }
