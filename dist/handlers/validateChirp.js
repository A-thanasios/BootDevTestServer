import { BadRequest } from "../customErrors.js";
const blackList = ['kerfuffle', 'sharbert', 'fornax'];
const replacement = '****';
export async function handlerValidateChirp(req, res) {
    const chirpText = req.body.body;
    if (chirpText.length > 140) {
        throw new BadRequest("Chirp is too long. Max length is 140");
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
