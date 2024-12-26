'use client'

import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function CreateTaskForm() {
    const [title, setTitle] = useState("");
    const router = useRouter();
    const { user } = use(UserContext)

    async function createTask(event) {
        event.preventDefault();

        try {
            await axios.post('http://localhost:8000/api/tasks', { title, userId: user.userId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            router.push('/tasks');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={createTask}>
            <div className="mb-4">
                <label className="block">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create Task
            </button>
        </form>
    )
}