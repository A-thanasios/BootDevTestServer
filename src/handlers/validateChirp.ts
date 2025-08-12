import { Request, Response } from "express";
import { BadRequest } from "../customErrors.js";

const blackList: string[] = ['kerfuffle', 'sharbert', 'fornax'];
const replacement: string = '****';

export async function handlerValidateChirp(req: Request, res: Response): Promise<void>
    {
                const chirpText = req.body.body;

                if (chirpText.length > 140)
                {
                    throw new BadRequest("Chirp is too long. Max length is 140");
                }
                else
                {
                    const splitText: string[] = chirpText.split(" ");
                    const verifiedList: string[] = [];
                        for (const word of splitText)
                        {
                            if (blackList.includes(word.toLowerCase()))
                            {
                                verifiedList.push(replacement);
                            }
                            else verifiedList.push(word);
                        }
                    const verifiedText: string = verifiedList.join(" ");

                    res.header("Content-Type", "application/json");
                    res.status(200).json({ cleanedBody: verifiedText });
                }
    }