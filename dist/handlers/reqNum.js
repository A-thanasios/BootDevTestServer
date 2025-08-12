import { apiConfig } from "../config.js";
export function handlerReqNm(req, res) {
    res.send(`Hits: ${apiConfig.fileserverHits}`);
}
