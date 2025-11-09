PRAGMA foreign_keys = OFF;
--> statement-breakpoint
CREATE TABLE `__new_accounts` (
	`_account_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`_user_id` integer,
	`email` text NOT NULL,
	`mobile_number` text DEFAULT '' NOT NULL,
	`password_hash` text NOT NULL,
	FOREIGN KEY (`_user_id`) REFERENCES `users`(`_user_id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_accounts`(
		"_account_id",
		"_user_id",
		"email",
		"password_hash"
	)
SELECT "_account_id",
	"_user_id",
	"email",
	"password_hash"
FROM `accounts`;
--> statement-breakpoint
DROP TABLE `accounts`;
--> statement-breakpoint
ALTER TABLE `__new_accounts`
	RENAME TO `accounts`;
--> statement-breakpoint
PRAGMA foreign_keys = ON;
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_email_unique` ON `accounts` (`email`);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_mobile_number_unique` ON `accounts` (`mobile_number`);