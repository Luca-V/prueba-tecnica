'use client'

import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function UserLoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const rounter = useRouter();
    const userContext = use(UserContext);

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                username,
                password
            });

            localStorage.setItem('token', response.data.token);

            rounter.push('/')

            const decodedUser = jwtDecode(token);

            userContext.setUser(decodedUser);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleLogin} className="max-w-md m-auto p-6 rounded-lg shadow-lg bg-white text-gray-700">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Login
            </button>
        </form>
    )
}