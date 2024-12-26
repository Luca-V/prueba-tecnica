import pool from "../db";

interface User {
    id: number;
    username: string;
    password: string;
}

export async function getUser(username: string): Promise<User> {
    return await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
        .then((result) => {
            return result.rows[0];
        })
        .catch((error: Error) => {
            throw error;
        });
}