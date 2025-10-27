import z from "zod";
import { create } from "zustand";

import { validateEmail, validatePassword } from "../validations";

type LoginState = {
    email: string;
    password: string;

    emailError: string;
    passwordError: string;

    hasSubmittedOnce: boolean;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    validate: () => boolean;
    clearAll: () => void;
};

export const useLoginStore = create<LoginState>((set, get) => {
    return {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        hasSubmittedOnce: false,

        setEmail: (email: string) => {
            const { hasSubmittedOnce } = get();
            const emailError = hasSubmittedOnce ? validateEmail(email) : "";

            set({ email, emailError });
        },
        setPassword: (password: string) => {
            const { hasSubmittedOnce } = get();
            const passwordError = hasSubmittedOnce
                ? validatePassword(password)
                : "";

            set({ password, passwordError });
        },
        validate: () => {
            const { email, password } = get();

            const emailError = validateEmail(email);
            const passwordError = validatePassword(password);

            set({ emailError, passwordError, hasSubmittedOnce: true });

            return !emailError && !passwordError;
        },
        clearAll: () =>
            set({
                email: "",
                password: "",
                emailError: "",
                passwordError: "",
                hasSubmittedOnce: false
            })
    };
});
