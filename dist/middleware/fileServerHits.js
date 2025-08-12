import { apiConfig } from "../config.js";
export function MetricsInc(req, res, next) {
    if (req.url.startsWith("/app")) {
        apiConfig.fileserverHits++;
        next();
    }
    else {
        next();
    }
}
