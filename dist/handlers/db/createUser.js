import { createUser } from "../../db/queries/users.js";
export async function createNewUser(req, res) {
    const reqBody = req.body;
    const newUser = await createUser(reqBody.email, reqBody.password);
    if (newUser) {
        res.status(201).json(newUser);
    }
    else {
        res.status(400).json({ error: "User already exists or invalid data" });
    }
}
