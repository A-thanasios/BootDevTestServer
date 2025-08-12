import { BadRequest, NotFoundError } from "../customErrors.js";
export function errorHandler(err, req, res, next) {
    if (err instanceof NotFoundError) {
        res.status(404).send("Not Found");
    }
    else if (err instanceof BadRequest) {
        res.status(400).json({ error: err.message });
    }
    else {
        res.status(500).send("Internal Server Error");
    }
}
