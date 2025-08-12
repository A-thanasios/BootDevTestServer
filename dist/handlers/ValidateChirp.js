const blackList = ['kerfuffle', 'sharbert', 'fornax'];
const replacement = '****';
export async function handlerValidateChirp(req, res) {
    const chirpText = req.body.body;
    if (chirpText.length > 140) {
        res.header("Content-Type", "application/json");
        res.status(400).json({ error: "Chirp is too long" });
    }
    else {
        const splitText = chirpText.split(" ");
        const verifiedList = [];
        for (const word of splitText) {
            if (blackList.includes(word.toLowerCase())) {
                verifiedList.push(replacement);
            }
            else
                verifiedList.push(word);
        }
        const verifiedText = verifiedList.join(" ");
        res.header("Content-Type", "application/json");
        res.status(200).json({ cleanedBody: verifiedText });
    }
}
