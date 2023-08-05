ALTER TABLE `users` MODIFY COLUMN `username` text NOT NULL DEFAULT ('');--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `firstName` text NOT NULL DEFAULT ('');--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `lastName` text NOT NULL DEFAULT ('');--> statement-breakpoint
ALTER TABLE `users` ADD `email` text DEFAULT ('') NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `password` text DEFAULT ('') NOT NULL;