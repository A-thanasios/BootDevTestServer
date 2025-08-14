import { readAllChirps, readChirp } from "../../db/queries/chirps.js";
import { getBearerToken, validateJWT } from "../../auth.js";
import { apiConfig } from "../../config.js";
export async function readChirps(req, res) {
    const token = getBearerToken(req);
    const id = validateJWT(token, apiConfig.secret);
    if (id) {
        res.set("Content-Type", "application/json");
        res.status(200).json(await readChirp(id));
    }
    else {
        res.set("Content-Type", "application/json");
        res.status(200).json(await readAllChirps());
    }
}
