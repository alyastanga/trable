import { db } from "@/drizzle/db";
import {
    users,
    barangays,
    barangayAnnouncements,
    barangayProjects,
    barangayProjectImages,
    officials,
    barangayBudgets
} from "@/drizzle/schema";

export async function seedDatabase() {
    const existing = await db.select().from(users);
    if (existing.length > 0) return;

    const seedData = [
        {
            barangay: {
                name: "Barangay San Isidro",
                city: "Makati",
                province: "Metro Manila",
                displayImage: "SanIsidro.png"
            },
            user: {
                displayName: "JuanD",
                fullName: "Juan Dela Cruz",
                role: "official" as const
            },
            official: {
                position: "Barangay Captain",
                termStart: "2023-01-01",
                termEnd: "2026-12-31"
            },
            budget: {
                year: 2024,
                category: "infrastructure" as const,
                status: "approved" as const,
                amount: 500000,
                remarks: "Budget for road improvement"
            },
            project: {
                title: "Main Road Rehabilitation",
                description:
                    "Complete rehabilitation of the main road including drainage system",
                category: "infrastructure" as const,
                budgetAllocated: 450000,
                status: "ongoing" as const,
                startDate: new Date("2024-01-15"),
                estimatedEndDate: new Date("2024-06-30")
            },
            announcement: {
                title: "Community Cleanup",
                content: "Join us this Saturday!"
            },
            projectImages: [
                {
                    url: "road-before.jpg",
                    caption: "Road condition before rehabilitation"
                },
                { url: "road-progress.jpg", caption: "Current progress" }
            ]
        },
        {
            barangay: {
                name: "Barangay San Jose",
                city: "Rodriguez",
                province: "Rizal",
                displayImage: "SanJose.png"
            },
            user: {
                displayName: "MariaS",
                fullName: "Maria Santos",
                role: "official" as const
            },
            official: {
                position: "Kagawad",
                termStart: "2023-01-01",
                termEnd: "2026-12-31"
            },
            budget: {
                year: 2024,
                category: "health" as const,
                status: "approved" as const,
                amount: 200000,
                remarks: "Health center renovation"
            },
            project: {
                title: "Health Center Renovation",
                description:
                    "Renovation and equipment upgrade for the barangay health center",
                category: "health" as const,
                budgetAllocated: 180000,
                status: "planned" as const,
                startDate: new Date("2024-03-01"),
                estimatedEndDate: new Date("2024-08-31")
            },
            announcement: {
                title: "General Assembly!",
                content:
                    "Please attend the General Assembly this Friday at 6 PM in the Barangay Hall."
            },
            projectImages: [
                {
                    url: "health-center.jpg",
                    caption: "Current health center building"
                }
            ]
        },
        {
            barangay: {
                name: "Barangay 72",
                city: "Caloocan City",
                province: "Metro Manila",
                displayImage: "SantaCruz.png"
            },
            user: {
                displayName: "PedroR",
                fullName: "Pedro Reyes",
                role: "official" as const
            },
            official: {
                position: "SK Chairman",
                termStart: "2023-01-01",
                termEnd: "2026-12-31"
            },
            budget: {
                year: 2024,
                category: "education" as const,
                status: "approved" as const,
                amount: 150000,
                remarks: "Youth education program"
            },
            project: {
                title: "Youth Skills Training Program",
                description: "Vocational training for out-of-school youth",
                category: "education" as const,
                budgetAllocated: 120000,
                status: "ongoing" as const,
                startDate: new Date("2024-02-01"),
                estimatedEndDate: new Date("2024-07-31")
            },
            announcement: {
                title: "Free Skills Training!",
                content:
                    "Register now for our free vocational training program."
            },
            projectImages: [
                { url: "training-center.jpg", caption: "Training facility" }
            ]
        }
    ];

    for (const data of seedData) {
        const [barangay] = await db
            .insert(barangays)
            .values(data.barangay)
            .returning();

        const [user] = await db
            .insert(users)
            .values({
                displayName: data.user.displayName,
                fullName: data.user.fullName,
                role: data.user.role
            })
            .returning();

        const [official] = await db
            .insert(officials)
            .values({
                _userId: user._userId,
                _barangayId: barangay._barangayId,
                position: data.official.position,
                termStart: data.official.termStart,
                termEnd: data.official.termEnd
            })
            .returning();

        const [budget] = await db
            .insert(barangayBudgets)
            .values({
                _barangayId: barangay._barangayId,
                uploadedByOfficial: official._officialId,
                postStatus: "published",
                year: data.budget.year,
                category: data.budget.category,
                status: data.budget.status,
                amount: data.budget.amount,
                remarks: data.budget.remarks
            })
            .returning();

        const [project] = await db
            .insert(barangayProjects)
            .values({
                _barangayId: barangay._barangayId,
                _officialId: official._officialId,
                _budgetId: budget._barangayBudgetId,
                postStatus: "published",
                title: data.project.title,
                description: data.project.description,
                category: data.project.category,
                budgetAllocated: data.project.budgetAllocated,
                status: data.project.status,
                startDate: data.project.startDate,
                estimatedEndDate: data.project.estimatedEndDate
            })
            .returning();

        console.log("Inserted project:", project);

        if (data.projectImages && data.projectImages.length > 0) {
            await db.insert(barangayProjectImages).values(
                data.projectImages.map((img) => ({
                    _barangayProjectId: project._barangayProjectId,
                    url: img.url,
                    caption: img.caption
                }))
            );
        }

        await db.insert(barangayAnnouncements).values({
            _barangayId: barangay._barangayId,
            postedBy: user._userId,
            scope: "barangay",
            postStatus: "published",
            title: data.announcement.title,
            content: data.announcement.content
        });
    }

    console.log("Database seeded successfully with projects!");
}
