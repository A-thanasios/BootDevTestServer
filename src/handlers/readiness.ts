import { Request, Response } from "express";

export function handlerReadiness(req: Request, res: Response): void
{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    res.send('OK');
}