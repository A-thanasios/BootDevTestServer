import { getBearerToken, validateJWT } from "../../../auth.js";
import { apiConfig } from "../../../config.js";
import { readUserChirp, deleteChirp, readChirp } from "../../../db/queries/chirps.js";
export async function deleteUserChirp(req, res) {
    const token = getBearerToken(req);
    const id = validateJWT(token, apiConfig.secret);
    if (!id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const chirpId = req.params["id"];
    if (!(await readChirp(chirpId))) {
        res.status(404).json({ error: "Chirp not found" });
    }
    if (await readUserChirp(id, chirpId)) {
        await deleteChirp(chirpId);
        res.status(204).end();
    }
    else {
        res.status(403).json({ error: "Forbidden" });
    }
}
