'use client'

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "@/contexts/UserContext";
import { usePathname, useRouter } from "next/navigation";

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const route = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwtDecode(token);

            setUser(decodedUser.payload);

            if (route === "/login") {
                router.push("/");
            }
        } else {
            router.push("/login");
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}