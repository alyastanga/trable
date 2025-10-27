import { create } from "zustand";

type LoginState = {
    email: string;
    password: string;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    clearAll: () => void;
};

export const useLoginStore = create<LoginState>((set) => {
    return {
        email: "",
        password: "",

        setEmail: (email: string) => set({ email }),
        setPassword: (password: string) => set({ password }),

        clearAll: () => set({ email: "", password: "" })
    };
});
