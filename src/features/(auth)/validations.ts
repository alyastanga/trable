import { z } from "zod";

// --- Zod validators ---
const emailSchema = z
    .email({ error: "Enter a valid email address" })
    .nonempty({ error: "Email is required" });

const passwordSchema = z
    .string()
    .nonempty({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { error: "Must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { error: "Must contain at least one uppercase letter" })
    .regex(/\d/, { error: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
        error: "Must contain at least one special character"
    });

const validateEmail = (email: string) => {
    const result = emailSchema.safeParse(email);

    return result.success ? "" : result.error.message;
};

const validatePassword = (password: string) => {
    const result = passwordSchema.safeParse(password);

    return result.success ? "" : result.error.message;
};

export { emailSchema, passwordSchema, validateEmail, validatePassword };
