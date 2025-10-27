import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

const timestamps = {
    _createdAt: integer("_created_at", { mode: "timestamp" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    _updatedAt: integer("_updated_at", { mode: "timestamp" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull()
};

const users = sqliteTable("users", {
    _userId: integer("_user_id").primaryKey({ autoIncrement: true }),
    displayName: text("display_name").notNull(),
    displayImage: text("display_image"),
    fullName: text("full_name").notNull(),
    role: text("role", {
        enum: ["resident", "official", "admin"]
    })
        .default("resident")
        .notNull(),
    ...timestamps
});

const userIdCards = sqliteTable("user_id_cards", {
    _userIdCardId: integer("_user_id_card_id").primaryKey({
        autoIncrement: true
    }),
    _userId: integer("_user_id")
        .references(() => users._userId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    type: text("type", {
        enum: [
            "school_id",
            "passport",
            "barangay_id",
            "national_id",
            "postal_id",
            "drivers_license"
        ]
    }).notNull(),
    imageUrl: text("image_url"),
    _createdAt: timestamps._createdAt
});

const userVerifications = sqliteTable("user_verifications", {
    _userVerificationId: integer("_user_verification_id").primaryKey({
        autoIncrement: true
    }),
    _userId: integer("_user_id")
        .references(() => users._userId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    type: text("type", {
        enum: ["community_join", "role_assignment", "id"]
    }).notNull(),
    status: text("status", { enum: ["pending", "approved", "rejected"] })
        .default("pending")
        .notNull(),
    verifiedBy: integer("verified_by").references(() => users._userId, {
        onDelete: "set null",
        onUpdate: "cascade"
    }),
    remarks: text("remarks"),
    ...timestamps
});

const userVerificationImages = sqliteTable("user_verification_images", {
    _userVerificationImageId: integer("_user_verification_image_id").primaryKey(
        { autoIncrement: true }
    ),
    verificationId: integer("verification_id")
        .references(() => userVerifications._userVerificationId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    url: text("url").notNull(),
    caption: text("caption"),
    createdAt: timestamps._createdAt
});

const userActivity = sqliteTable("user_activities", {
    _userActivityId: integer("_user_activity_id").primaryKey({
        autoIncrement: true
    }),
    _userId: integer("_user_id").references(() => users._userId, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    action: text("action", {
        enum: [
            "login",
            "logout",
            "write post",
            "edit post",
            "write comment",
            "edit comment",
            "edit profile",
            "give_reaction",
            "remove_reaction",
            "request_join",
            "verify_request",
            "other"
        ]
    }).notNull(),
    metadata: text("metadata"),
    targetType: text("target_type", {
        enum: ["project", "verification_request", "comment", "user", "other"]
    }),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    _createdAt: timestamps._createdAt
});

const accounts = sqliteTable("accounts", {
    _accountId: integer("_account_id").primaryKey({ autoIncrement: true }),
    _userId: integer("_user_id").references(() => users._userId, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull()
});
const sessions = sqliteTable("sessions", {
    _sessionId: integer("_session_id").primaryKey({ autoIncrement: true }),
    _accountId: integer("_account_id")
        .references(() => accounts._accountId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    sessionToken: text("session_token").notNull().unique(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    ...timestamps
});
const officials = sqliteTable("officials", {
    _officialId: integer("_official_id").primaryKey({ autoIncrement: true }),
    _userId: integer("_user_id").references(() => users._userId, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    _barangayId: integer("_barangay_id").references(
        () => barangays._barangayId,
        {
            onDelete: "cascade",
            onUpdate: "cascade"
        }
    ),
    position: text("position").notNull(),
    termStart: text("term_start"),
    termEnd: text("term_end"),
    ...timestamps
});

const barangays = sqliteTable("barangays", {
    _barangayId: integer("_barangay_id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    city: text("city").notNull(),
    province: text("province").notNull(),
    displayImage: text("display_image"),
    about: text("about"),
    ...timestamps
});

const barangayAnnouncements = sqliteTable("barangay_announcements", {
    _barangayAnnouncementId: integer("_barangay_announcement_id").primaryKey({
        autoIncrement: true
    }),
    _barangayId: integer("_barangay_id").references(
        () => barangays._barangayId,
        {
            onDelete: "cascade",
            onUpdate: "cascade"
        }
    ),
    title: text("title").notNull(),
    content: text("content").notNull(),
    postedBy: integer("posted_by").references(() => users._userId, {
        onDelete: "set null",
        onUpdate: "cascade"
    }),
    scope: text("scope", {
        enum: ["barangay", "community", "officials_only", "public"]
    })
        .default("barangay")
        .notNull(),
    postStatus: text("post_status", {
        enum: ["draft", "published", "archived"]
    })
        .default("draft")
        .notNull(),
    ...timestamps
});

const barangayAnnouncementImages = sqliteTable("barangay_announcement_images", {
    _barangayAnnouncementImageId: integer(
        "_barangay_announcement_image_id"
    ).primaryKey({ autoIncrement: true }),
    _barangayAnnouncementId: integer("_barangay_announcement_id")
        .references(() => barangayAnnouncements._barangayAnnouncementId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    url: text("url").notNull(),
    caption: text("caption"),
    _createdAt: timestamps._createdAt
});

const barangayBudgets = sqliteTable("barangay_budgets", {
    _barangayBudgetId: integer("_barangay_budget_id").primaryKey({
        autoIncrement: true
    }),
    _barangayId: integer("_barangay_id")
        .references(() => barangays._barangayId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    uploadedByOfficial: integer("uploaded_by_official").references(
        () => officials._officialId,
        {
            onDelete: "set null",
            onUpdate: "cascade"
        }
    ),
    year: integer("year").notNull(),
    category: text("category", {
        enum: [
            "infrastructure",
            "health",
            "education",
            "social",
            "environment",
            "other"
        ]
    }).notNull(),
    status: text("status", {
        enum: ["planned", "approved", "ongoing", "completed", "cancelled"]
    })
        .default("planned")
        .notNull(),
    postStatus: text("post_status", {
        enum: ["draft", "published", "archived"]
    })
        .default("draft")
        .notNull(),
    amount: real("amount").default(0).notNull(),
    remarks: text("remarks"),
    ...timestamps
});

const barangayBudgetImages = sqliteTable("barangay_budget_images", {
    _barangayBudgetImageId: integer("_barangay_budget_image_id").primaryKey({
        autoIncrement: true
    }),
    _barangayBudgetId: integer("_barangay_budget_id")
        .references(() => barangayBudgets._barangayBudgetId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    url: text("url").notNull(),
    caption: text("caption"),
    _createdAt: timestamps._createdAt
});

const barangayProjects = sqliteTable("barangay_projects", {
    _barangayProjectId: integer("_barangay_project_id").primaryKey({
        autoIncrement: true
    }),
    _barangayId: integer("_barangay_id").references(
        () => barangays._barangayId,
        {
            onDelete: "cascade",
            onUpdate: "cascade"
        }
    ),
    _officialId: integer("_officialId").references(
        () => officials._officialId,
        {
            onDelete: "set null",
            onUpdate: "cascade"
        }
    ),
    _budgetId: integer("_budget_id").references(
        () => barangayBudgets._barangayBudgetId,
        {
            onDelete: "set null",
            onUpdate: "cascade"
        }
    ),
    title: text("title").notNull(),
    description: text("description"),
    category: text("category", {
        enum: [
            "infrastructure",
            "social",
            "environmental",
            "health",
            "education",
            "others"
        ]
    }).notNull(),
    budgetAllocated: real("budget_allocated").default(0),
    status: text("status", {
        enum: ["planned", "ongoing", "completed"]
    })
        .default("planned")
        .notNull(),
    postStatus: text("post_status", {
        enum: ["draft", "published", "archived"]
    })
        .default("draft")
        .notNull(),
    startDate: integer("start_date", { mode: "timestamp" }).notNull(),
    estimatedEndDate: integer("estimated_end_date", {
        mode: "timestamp"
    }).notNull(),
    endDate: integer("end_date", { mode: "timestamp" }),
    ...timestamps
});

const barangayProjectImages = sqliteTable("barangay_project_images", {
    _barangayProjectImageId: integer("_barangay_project_image_id").primaryKey({
        autoIncrement: true
    }),
    _barangayProjectId: integer("_barangay_project_id")
        .references(() => barangayProjects._barangayProjectId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    url: text("url").notNull(),
    caption: text("caption"),
    _createdAt: timestamps._createdAt
});

const barangayProjectMilestones = sqliteTable("barangay_project_milestones", {
    _barangayProjectMilestoneId: integer(
        "_barangay_project_milestone_id"
    ).primaryKey({ autoIncrement: true }),
    _barangayProjectId: integer("_barangay_project_id")
        .references(() => barangayProjects._barangayProjectId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    title: text("title").notNull(),
    description: text("description"),
    dueDate: integer("due_date", { mode: "timestamp" }),
    isCompleted: integer("is_completed", { mode: "boolean" }).default(false),
    ...timestamps
});

export const barangayProjectMilestoneImages = sqliteTable(
    "barangay_project_milestone_images",
    {
        _barangayProjectMilestoneImageId: integer(
            "_barangay_project_milestone_image_id"
        ).primaryKey({ autoIncrement: true }),
        _barangayProjectMilestoneId: integer("_barangay_project_milestone_id")
            .references(
                () => barangayProjectMilestones._barangayProjectMilestoneId,
                {
                    onDelete: "cascade",
                    onUpdate: "cascade"
                }
            )
            .notNull(),
        url: text("url").notNull(),
        caption: text("caption"),
        _createdAt: timestamps._createdAt
    }
);

const communityMemberships = sqliteTable("community_memberships", {
    _communityMembershipId: integer("_community_membership_id").primaryKey({
        autoIncrement: true
    }),
    _userId: integer("_user_id")
        .references(() => users._userId, {
            onDelete: "cascade",
            onUpdate: "cascade"
        })
        .notNull(),
    _barangayId: integer("_barangay_id").references(
        () => barangays._barangayId,
        {
            onDelete: "cascade",
            onUpdate: "cascade"
        }
    ),
    communityRole: text("community_role", {
        enum: ["guest", "member", "resident", "official", "moderator", "admin"]
    }),
    _createdAt: integer("_created_at", { mode: "timestamp" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    _updatedAt: integer("_updated_at", { mode: "timestamp" })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull()
});

export {
    users,
    userIdCards,
    userActivity,
    userVerificationImages,
    userVerifications,
    accounts,
    sessions,
    officials,
    barangays,
    barangayAnnouncementImages,
    barangayAnnouncements,
    barangayBudgetImages,
    barangayBudgets,
    barangayProjectImages,
    barangayProjectMilestones,
    barangayProjects,
    communityMemberships
};
