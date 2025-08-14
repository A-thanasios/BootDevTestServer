import { Request, Response } from "express";
import { readAllChirps, readUserChirp, readUserChirps } from "../../../db/queries/chirps.js";
import { getBearerToken, validateJWT } from "../../../auth.js";
import { apiConfig } from "../../../config.js";

export async function readChirps(req: Request, res: Response): Promise<void>
    {
        let sort = true;
        if (req.query.sort === 'desc')
        {
            sort = false;
        }
        if (!req.params["authorId"] && !req.query["authorId"])
        {
            const chirps = await readAllChirps(sort);
            if (chirps.length === 0) {res.status(404).json({ error: "No chirps found" }); return; }
            res.set("Content-Type", "application/json");
            res.status(200).json(chirps);
        }

        const userId: string = req.params["authorId"] ? req.params["authorId"] : req.query["authorId"] as string;
        try
        {
            if (userId)
            {
                const chirpId = req.params["id"];
                if (chirpId)
                {
                    const chirp = await readUserChirp(userId, chirpId, sort);
                    if (!chirp) {res.status(404).json({ error: "No chirp with id " + chirpId }); return; }
                    res.set("Content-Type", "application/json");
                    res.status(200).json(chirp);
                }
                else
                {
                    const userChirps = await readUserChirps(userId, sort);
                    if (userChirps.length === 0) {res.status(404).json({ error: "No chirps found for user" }); return; }
                        res.set("Content-Type", "application/json");
                        res.status(200).json(userChirps);
                }
            }
        } catch (err)
        {
            console.error(err);
            res.status(500).end();
        }
    }
