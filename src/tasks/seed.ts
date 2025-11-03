import { db } from "@/drizzle/db";
import { users, barangays, barangayAnnouncements } from "@/drizzle/schema";

export async function seedDatabase() {
    const existing = await db.select().from(users);
    if (existing.length > 0) return;

    // Seed example
    const barangay = await db
        .insert(barangays)
        .values({
            name: "Barangay San Isidro",
            city: "Makati",
            province: "Metro Manila",
            displayImage: "SanIsidro.png"
        })
        .returning();

    const user = await db
        .insert(users)
        .values({
            displayName: "JuanD",
            fullName: "Juan Dela Cruz",
            role: "resident"
        })
        .returning();

    await db.insert(barangayAnnouncements).values({
        _barangayId: barangay[0]._barangayId,
        title: "Community Cleanup",
        content: "Join us this Saturday!",
        postedBy: user[0]._userId,
        scope: "barangay",
        postStatus: "published"
    });

    const barangay2 = await db
        .insert(barangays)
        .values({
            name: "Barangay San Jose",
            city: "Rodriguez",
            province: "Rizal",
            displayImage: "SanJose.png"
        })
        .returning();

    const user2 = await db
        .insert(users)
        .values({
            displayName: "MariaS",
            fullName: "Maria Santos",
            role: "resident"
        })
        .returning();

    await db.insert(barangayAnnouncements).values({
        _barangayId: barangay2[0]._barangayId,
        title: "General Assembly!",
        content:
            "Please attend the General Assembly this Friday at 6 PM in the Barangay Hall.",
        postedBy: user2[0]._userId,
        scope: "barangay",
        postStatus: "published"
    });
}
