import { readAllChirps, readUserChirp, readUserChirps } from "../../../db/queries/chirps.js";
export async function readChirps(req, res) {
    let sort = true;
    if (req.query.sort === 'desc') {
        sort = false;
    }
    if (!req.params["authorId"] && !req.query["authorId"]) {
        const chirps = await readAllChirps(sort);
        if (chirps.length === 0) {
            res.status(404).json({ error: "No chirps found" });
            return;
        }
        res.set("Content-Type", "application/json");
        res.status(200).json(chirps);
    }
    const userId = req.params["authorId"] ? req.params["authorId"] : req.query["authorId"];
    try {
        if (userId) {
            const chirpId = req.params["id"];
            if (chirpId) {
                const chirp = await readUserChirp(userId, chirpId, sort);
                if (!chirp) {
                    res.status(404).json({ error: "No chirp with id " + chirpId });
                    return;
                }
                res.set("Content-Type", "application/json");
                res.status(200).json(chirp);
            }
            else {
                const userChirps = await readUserChirps(userId, sort);
                if (userChirps.length === 0) {
                    res.status(404).json({ error: "No chirps found for user" });
                    return;
                }
                res.set("Content-Type", "application/json");
                res.status(200).json(userChirps);
            }
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
}
