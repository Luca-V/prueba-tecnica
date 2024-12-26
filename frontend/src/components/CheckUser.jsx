'use client'
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function CheckUser() {
    const { user } = use(UserContext);
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem('token')
        router.push('/login');
    }

    return (
        <>
            {user ? (
                <>
                    <p>Welcome, {user.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : <p>Welcome to the home page</p>}
        </>
    )
}