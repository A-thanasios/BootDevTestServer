import { BadRequest } from "../../customErrors.js";
import { createChirp } from "../../db/queries/chirps.js";
import { getBearerToken, validateJWT } from "../../auth.js";
import { apiConfig } from "../../config.js";
const blackList = ['kerfuffle', 'sharbert', 'fornax'];
const replacement = '****';
export async function createNewChirp(req, res) {
    const chirpText = req.body.body;
    const token = getBearerToken(req);
    const userId = validateJWT(token, apiConfig.secret);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (chirpText.length > 140) {
        throw new BadRequest("Chirp is too long. Max length is 140");
    }
    else {
        const splitText = chirpText.split(" ");
        const verifiedList = [];
        for (const word of splitText) {
            if (blackList.includes(word.toLowerCase())) {
                verifiedList.push(replacement);
            }
            else
                verifiedList.push(word);
        }
        const verifiedText = verifiedList.join(" ");
        const newChirp = await createChirp(userId, verifiedText);
        res.header("Content-Type", "application/json");
        res.status(201).json(newChirp);
    }
}
