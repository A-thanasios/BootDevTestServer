export function LogResponses(req, res, next) {
    res.on('finish', () => {
        const statusCode = res.statusCode;
        if (statusCode >= 299 || statusCode < 200) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
        }
    });
    next();
}
