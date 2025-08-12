export function handlerReadiness(req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('OK');
}
