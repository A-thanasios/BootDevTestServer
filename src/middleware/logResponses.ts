import {NextFunction, Request, Response} from 'express';

export function LogResponses(req: Request, res: Response, next: NextFunction): void
{
    res.on('finish', () =>
    {
        const statusCode: number = res.statusCode;

        if (statusCode >= 299 || statusCode < 200)
        {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
        }

    });
    next();
}