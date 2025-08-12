export function errorHandler(err, req, res, next) {
    console.error("Something went wrong on our end");
    res.status(500).json({
        error: "Something went wrong on our end",
    });
}
