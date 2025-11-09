import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { accounts } from "@/drizzle/schema";

type LoginData = {
    email: string;
    password: string;
};

export async function loginUser(data: LoginData) {
    const { email, password } = data;

    const user = await db
        .select()
        .from(accounts)
        .where(eq(accounts.email, email));

    if (user.length === 0) {
        throw new Error("User not exist.");
    }

    const existingUser = user[0];

    if (existingUser.passwordHash !== password) {
        throw new Error("Invalid password.");
    }

    return {
        success: true,
        user: {
            email: existingUser.email,
            password: existingUser.passwordHash
        }
    };
}
