import { apiConfig } from "../config.js";
import { deleteUsers } from "../db/queries/users.js";
export async function handlerReset(req, res) {
    if (apiConfig.platform === "dev") {
        apiConfig.fileserverHits = 0;
        await deleteUsers();
        res.send("OK");
    }
    else
        res.status(403).send("Forbidden: Reset is only allowed in development mode.");
}
