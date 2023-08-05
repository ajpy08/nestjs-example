CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` text,
	`firstName` text,
	`lastName` text,
	`active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
