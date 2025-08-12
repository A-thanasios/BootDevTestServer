import { apiConfig } from "../config.js";
export function handlerReqNm(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(`<h1>Welcome, Chirpy Admin</h1>
                        <p>Chirpy has been visited ${apiConfig.fileserverHits} times!</p>`);
}
