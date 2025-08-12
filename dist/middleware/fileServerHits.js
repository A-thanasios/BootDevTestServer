import { apiConfig } from "../config.js";
export function MetricsInc(req, res, next) {
    if (req.url.endsWith("/metrics") || req.url.endsWith("/reset")) {
        next();
    }
    else {
        apiConfig.fileserverHits++;
        next();
    }
}
