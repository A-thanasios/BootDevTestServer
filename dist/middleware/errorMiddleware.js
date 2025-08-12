export function errorMiddleware(err, req, res, next) {
    if (err instanceof NotFoundError) {
        res.status(404).send("Not Found");
    }
    else if (err instanceof BadRequest) {
        res.status(400).send("Chirp is too long. Max length is 140");
    }
    else {
        res.status(500).send("Internal Server Error");
    }
}
