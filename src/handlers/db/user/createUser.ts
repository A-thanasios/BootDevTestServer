import { Request, Response } from "express";
import { createUser } from "../../../db/queries/users.js";
import { User } from "../../../db/schema.js";

export async function createNewUser(req: Request, res: Response): Promise<void>
    {
        const reqBody = req.body;
        const newUser: User = await createUser(reqBody.email, reqBody.password);
        if (newUser) {
            res.status(201).json(newUser);
        } else {
            res.status(400).json({ error: "User already exists or invalid data" });
        }
    }