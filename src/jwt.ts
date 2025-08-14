import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

type Payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(userID: string, expiresIn: number, secret: string): string
    {
        const iat: number = Math.floor(Date.now() / 1000);
        const payload: Payload =
            {
                iss: "chirpy",
                sub: userID,
                iat: iat,
                exp: iat + expiresIn
            };
        return jwt.sign(payload, secret);
    }