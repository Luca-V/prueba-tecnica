import jwt from "jsonwebtoken";

export function generateToken(payload: string | object): string {
    return jwt.sign({ payload }, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

export function validateToken(token: string): string | object {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch {
        return "Invalid token";
    }
}