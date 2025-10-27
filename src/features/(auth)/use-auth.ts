import { useContext } from "react";

import { AuthContext } from "@/features/(auth)/AuthContext";

export default function useAuth() {
    const ctx = useContext(AuthContext);

    if (ctx == null) {
        throw new Error("Component is not inside `AuthContextProvider`");
    }

    return ctx;
}
