import type { Request, Response, NextFunction } from "express";
import { getUser } from "../services/userServices";
import { generateToken } from "../utils/jwt";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: "Username and Password are required" });
            return;
        }

        const user = await getUser(username);

        if (!user || password !== user.password) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }

        const token = generateToken({ userId: 1, username: username });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
}