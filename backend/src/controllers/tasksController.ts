import type { Request, Response, NextFunction } from "express";
import pool from "../db";

export function getTasks(req: Request, res: Response, next: NextFunction) {
    pool.query("SELECT * FROM tasks")
        .then((result) => {
            return res.status(200).json({ tasks: result.rows, total: result.rows.length });
        })
        .catch((error: Error) => {
            return res.status(500).json({ message: "Internal server error" });
        });
}


export function createTask(req: Request, res: Response, next: NextFunction) {
    const { title, userId } = req.body;

    if (!title || !userId) {
        res.status(400).json({ message: "title and userId are required" });
        return;
    }

    pool.query(`INSERT INTO tasks (title, user_id) VALUES ('${title}', '${userId}')`)
        .then((result) => {
            return res.status(201).json(result.rows[0]);
        })
        .catch((error: Error) => {
            return res.status(500).json({ message: "Internal server error" });
        });
}

export function updateTask(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    pool.query(`UPDATE tasks SET completed = true WHERE id = ${id}`)
        .then((result) => {
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Task not found" });
            }

            return res.status(200).json({ message: "Task updated successfully" });
        })
        .catch((error: Error) => {
            return res.status(500).json({ message: "Internal server error" });
        });
}

export function deleteTask(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    pool.query(`DELETE FROM tasks WHERE id = ${id}`)
        .then((result) => {
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Task not found" });
            }

            return res.status(204).json({ message: "Task deleted successfully" });
        })
        .catch((error: Error) => {
            return res.status(500).json({ message: "Internal server error" });
        });
}