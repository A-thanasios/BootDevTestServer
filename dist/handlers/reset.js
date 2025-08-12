import { apiConfig } from "../config.js";
export function handlerReset(req, res) {
    apiConfig.fileserverHits = 0;
    res.send("OK");
}
