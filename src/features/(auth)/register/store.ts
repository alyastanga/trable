import { create } from "zustand";

import { validateEmail, validatePassword } from "../validations";

type RegisterState = {
    email: string;
    userName: string;
    password: string;
    mobileNumber: string;
    confirmPassword: string;

    emailError: string;
    userNameError: string;
    mobileNumberError: string;
    passwordError: string;
    confirmPasswordError: string;

    hasSubmittedOnce: boolean;

    setEmail: (email: string) => void;
    setUserName: (userName: string) => void;
    setMobileNumber: (mobileNumber: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;

    validate: () => boolean;
    clearAll: () => void;
};

export const useRegisterStore = create<RegisterState>((set, get) => {
    return {
        email: "",
        userName: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",

        emailError: "",
        userNameError: "",
        mobileNumberError: "",
        passwordError: "",
        confirmPasswordError: "",

        hasSubmittedOnce: false,

        setEmail: (email: string) => {
            const { hasSubmittedOnce } = get();
            const emailError = hasSubmittedOnce ? validateEmail(email) : "";

            set({ email, emailError });
        },

        setUserName: (userName: string) => {
            const { hasSubmittedOnce } = get();
            const userNameError =
                hasSubmittedOnce && userName.length < 3
                    ? "Username must be at least 3 characters"
                    : "";
            set({ userName, userNameError });
        },

        setMobileNumber: (mobileNumber: string) => {
            const { hasSubmittedOnce } = get();
            const mobileNumberError =
                hasSubmittedOnce && !/^\d{10,15}$/.test(mobileNumber)
                    ? "Enter a valid mobile number"
                    : "";
            set({ mobileNumber, mobileNumberError });
        },

        setPassword: (password: string) => {
            const { hasSubmittedOnce } = get();
            const passwordError = hasSubmittedOnce
                ? validatePassword(password)
                : "";

            set({ password, passwordError });
        },

        setConfirmPassword: (confirmPassword: string) => {
            const { hasSubmittedOnce, password } = get();
            const confirmPasswordError =
                hasSubmittedOnce && confirmPassword !== password
                    ? "Passwords do not match"
                    : "";
            set({ confirmPassword, confirmPasswordError });
        },

        validate: () => {
            const { email, userName, mobileNumber, password, confirmPassword } =
                get();

            const emailError = validateEmail(email);
            const userNameError =
                userName.length < 3
                    ? "Username must be at least 3 characters"
                    : "";
            const mobileNumberError = !/^\d{10,15}$/.test(mobileNumber)
                ? "Enter a valid mobile number"
                : "";
            const passwordError = validatePassword(password);
            const confirmPasswordError =
                confirmPassword !== password ? "Passwords do not match" : "";

            set({
                emailError,
                userNameError,
                mobileNumberError,
                passwordError,
                confirmPasswordError,
                hasSubmittedOnce: true
            });

            return (
                !emailError &&
                !userNameError &&
                !mobileNumberError &&
                !passwordError &&
                !confirmPasswordError
            );
        },

        clearAll: () =>
            set({
                email: "",
                userName: "",
                mobileNumber: "",
                password: "",
                confirmPassword: "",

                emailError: "",
                userNameError: "",
                mobileNumberError: "",
                passwordError: "",
                confirmPasswordError: "",
                hasSubmittedOnce: false
            })
    };
});
