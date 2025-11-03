CREATE TABLE `accounts` (
	`_account_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_user_id` integer,
	`email` text NOT NULL,
	`mobile_number` text NOT NULL,
	`password_hash` text NOT NULL,
	FOREIGN KEY (`_user_id`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);
--> statement-breakpoint
CREATE TABLE `barangay_announcement_images` (
	`_barangay_announcement_image_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_announcement_id` integer NOT NULL,
	`url` text NOT NULL,
	`caption` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_announcement_id`) REFERENCES `barangay_announcements`(`_barangay_announcement_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `barangay_announcements` (
	`_barangay_announcement_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_id` integer,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`posted_by` integer,
	`scope` text DEFAULT 'barangay' NOT NULL,
	`post_status` text DEFAULT 'draft' NOT NULL,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_id`) REFERENCES `barangays`(`_barangay_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`posted_by`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE
	set null
);
--> statement-breakpoint
CREATE TABLE `barangay_budget_images` (
	`_barangay_budget_image_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_budget_id` integer NOT NULL,
	`url` text NOT NULL,
	`caption` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_budget_id`) REFERENCES `barangay_budgets`(`_barangay_budget_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `barangay_budgets` (
	`_barangay_budget_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_id` integer NOT NULL,
	`uploaded_by_official` integer,
	`year` integer NOT NULL,
	`category` text NOT NULL,
	`status` text DEFAULT 'planned' NOT NULL,
	`post_status` text DEFAULT 'draft' NOT NULL,
	`amount` real DEFAULT 0 NOT NULL,
	`remarks` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_id`) REFERENCES `barangays`(`_barangay_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`uploaded_by_official`) REFERENCES `officials`(`_official_id`) ON UPDATE cascade ON DELETE
	set null
);
--> statement-breakpoint
CREATE TABLE `barangay_project_images` (
	`_barangay_project_image_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_project_id` integer NOT NULL,
	`url` text NOT NULL,
	`caption` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_project_id`) REFERENCES `barangay_projects`(`_barangay_project_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `barangay_project_milestone_images` (
	`_barangay_project_milestone_image_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_project_milestone_id` integer NOT NULL,
	`url` text NOT NULL,
	`caption` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_project_milestone_id`) REFERENCES `barangay_project_milestones`(`_barangay_project_milestone_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `barangay_project_milestones` (
	`_barangay_project_milestone_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_project_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`due_date` integer,
	`is_completed` integer DEFAULT false,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_project_id`) REFERENCES `barangay_projects`(`_barangay_project_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `barangay_projects` (
	`_barangay_project_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_barangay_id` integer,
	`_officialId` integer,
	`_budget_id` integer,
	`title` text NOT NULL,
	`description` text,
	`category` text NOT NULL,
	`budget_allocated` real DEFAULT 0,
	`status` text DEFAULT 'planned' NOT NULL,
	`post_status` text DEFAULT 'draft' NOT NULL,
	`start_date` integer NOT NULL,
	`estimated_end_date` integer NOT NULL,
	`end_date` integer,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_barangay_id`) REFERENCES `barangays`(`_barangay_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`_officialId`) REFERENCES `officials`(`_official_id`) ON UPDATE cascade ON DELETE
	set null,
		FOREIGN KEY (`_budget_id`) REFERENCES `barangay_budgets`(`_barangay_budget_id`) ON UPDATE cascade ON DELETE
	set null
);
--> statement-breakpoint
CREATE TABLE `barangays` (
	`_barangay_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`city` text NOT NULL,
	`province` text NOT NULL,
	`display_image` text,
	`about` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `community_memberships` (
	`_community_membership_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_user_id` integer NOT NULL,
	`_barangay_id` integer,
	`community_role` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_user_id`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`_barangay_id`) REFERENCES `barangays`(`_barangay_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `officials` (
	`_official_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_user_id` integer,
	`_barangay_id` integer,
	`position` text NOT NULL,
	`term_start` text,
	`term_end` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_user_id`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`_barangay_id`) REFERENCES `barangays`(`_barangay_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`_session_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_account_id` integer NOT NULL,
	`session_token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_account_id`) REFERENCES `accounts`(`_account_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_session_token_unique` ON `sessions` (`session_token`);
--> statement-breakpoint
CREATE TABLE `user_activities` (
	`_user_activity_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_user_id` integer,
	`action` text NOT NULL,
	`metadata` text,
	`target_type` text,
	`ip_address` text,
	`user_agent` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_user_id`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_id_cards` (
	`_user_id_card_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_user_id` integer NOT NULL,
	`type` text NOT NULL,
	`image_url` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_user_id`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_verification_images` (
	`_user_verification_image_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`verification_id` integer NOT NULL,
	`url` text NOT NULL,
	`caption` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`verification_id`) REFERENCES `user_verifications`(`_user_verification_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_verifications` (
	`_user_verification_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_user_id` integer NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`verified_by` integer,
	`remarks` text,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`_user_id`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`verified_by`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE
	set null
);
--> statement-breakpoint
CREATE TABLE `users` (
	`_user_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`display_name` text NOT NULL,
	`display_image` text,
	`full_name` text NOT NULL,
	`role` text DEFAULT 'resident' NOT NULL,
	`_created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`_updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);