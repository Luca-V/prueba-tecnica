'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(5);
    const router = useRouter();

    async function getTasks() {
        try {
            const { data } = await axios.get('http://localhost:8000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!data.tasks.length) return;

            setTasks(data.tasks);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteTask(id) {
        try {
            await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    async function updateTask(id) {
        try {
            await axios.patch(`http://localhost:8000/api/tasks/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, completed: true } : task));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTasks();
    }, [currentPage]);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    return (
        <div className="max-w-md m-auto p-4 text-slate-700 bg-white rounded-lg">
            <h1>Tasks</h1>
            <ul className="space-y-4">
                {tasks.length > 0 ? (
                    <div>
                        <button onClick={() => router.push('/tasks/create')} className="my-2 text-white px-4 py-2 rounded bg-teal-600">Create a new task</button>
                        {currentTasks.map((task) => {
                            return (
                                <li key={task.id} className="bg-slate-300 shadow-md rounded-lg p-4 flex items-center justify-between my-3">
                                    <div className="flex">
                                        <input type="checkbox" checked={task.completed} onChange={() => updateTask(task.id)} className="mr-3" />
                                        <h2 className="text-xl font-semibold">{task.title}</h2>
                                    </div>
                                    <div className="space-x-2">
                                        <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                                    </div>
                                </li>
                            );
                        })}

                        <div className="flex justify-center space-x-2 mt-4">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200">
                                Prev
                            </button>

                            <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>

                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200">
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-gray-500">You don't have pending tasks</p>
                        <button onClick={() => router.push('/tasks/create')} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create a task now</button>
                    </div>
                )}
            </ul>
        </div>
    );
}
