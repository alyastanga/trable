import { z } from "zod";

// --- Zod validators ---
const emailSchema = z
    .email({ error: "Invalid email address" })
    .nonempty({ error: "Email cannot be empty" });

const passwordSchema = z.string().refine(
    (str) => {
        return !/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(str);
    },
    {
        error: "Password must be at least 8 characters long with one uppercase, lowercase, digit, and special character. "
    }
);

const validateEmail = (email: string) => {
    const result = emailSchema.safeParse(email);

    return result.success ? "" : z.treeifyError(result.error).errors.at(-1);
};

const validatePassword = (password: string) => {
    const result = passwordSchema.safeParse(password);

    console.log(result);

    return result.success ? "" : z.treeifyError(result.error).errors.at(-1);
};

export { emailSchema, passwordSchema, validateEmail, validatePassword };
