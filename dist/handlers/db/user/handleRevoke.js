import { readRefreshToken, revokeRefreshToken } from "../../../db/queries/refreshToken.js";
import { getBearerToken } from "../../../auth.js";
export async function handleRevoke(req, res) {
    const token = await readRefreshToken(getBearerToken(req));
    if (token) {
        await revokeRefreshToken(token.token);
        res.status(204).end();
    }
    else {
        res.status(401).end();
    }
}
