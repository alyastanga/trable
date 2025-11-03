import { create } from "zustand";

import { validateEmail, validatePassword } from "../validations";

type RegisterState = {
    email: string;
    password: string;
    mobileNumber: string;
    confirmPassword: string;

    emailError: string;
    mobileNumberError: string;
    passwordError: string;
    confirmPasswordError: string;

    hasSubmittedOnce: boolean;

    setEmail: (email: string) => void;
    setMobileNumber: (mobileNumber: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;

    validate: () => boolean;
    clearAll: () => void;
};

export const useRegisterStore = create<RegisterState>((set, get) => {
    return {
        email: "",
        //  mobileNumber: "",
        password: "",
        confirmPassword: "",

        emailError: "",
        // mobileNumberError: "",
        passwordError: "",
        confirmPasswordError: "",

        hasSubmittedOnce: false,

        setEmail: (email: string) => {
            const { hasSubmittedOnce } = get();
            const emailError = hasSubmittedOnce ? validateEmail(email) : "";

            set({ email, emailError });
        },

        /* setMobileNumber: (mobileNumber: string) => {
            const { hasSubmittedOnce } = get();
            const mobileNumberError =
                hasSubmittedOnce && !/^\d{10,15}$/.test(mobileNumber)
                    ? "Enter a valid mobile number"
                    : "";
            set({ mobileNumber, mobileNumberError });
        }, */

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
            const { email, /*mobileNumber, */ password, confirmPassword } =
                get();

            const emailError = validateEmail(email);
            /* const mobileNumberError = !/^\d{10,15}$/.test(mobileNumber)
                ? "Enter a valid mobile number"
                : "";*/
            const passwordError = validatePassword(password);
            const confirmPasswordError =
                confirmPassword !== password ? "Passwords do not match" : "";

            set({
                emailError,
                // mobileNumberError,
                passwordError,
                confirmPasswordError,
                hasSubmittedOnce: true
            });

            return (
                !emailError &&
                //   !mobileNumberError &&
                !passwordError &&
                !confirmPasswordError
            );
        },

        clearAll: () =>
            set({
                email: "",
                //    mobileNumber: "",
                password: "",
                confirmPassword: "",

                emailError: "",
                //   mobileNumberError: "",
                passwordError: "",
                confirmPasswordError: "",
                hasSubmittedOnce: false
            })
    };
});
