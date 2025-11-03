import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { accounts } from "@/drizzle/schema";

type RegisterData = {
    email: string;
    password: string;
    // mobileNumber: string;
};

export async function registerUser(data: RegisterData) {
    const { email, password /*, mobileNumber */ } = data;

    const existingUser = await db
        .select()
        .from(accounts)
        .where(eq(accounts.email, email));

    if (existingUser.length > 0) {
        throw new Error("User with this email already exists.");
    }

    const insertedUser = await db
        .insert(accounts)
        .values({
            email,
            /// mobileNumber,
            passwordHash: password
        })
        .returning();

    return { success: true };
}
