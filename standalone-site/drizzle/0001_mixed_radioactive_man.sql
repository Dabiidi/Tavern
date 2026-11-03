CREATE TABLE `guest_chat` (
	`id` text PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`guest_id` text NOT NULL,
	`name` text NOT NULL,
	`text` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `guest_chat_room_time_idx` ON `guest_chat` (`room`,`created_at`);--> statement-breakpoint
CREATE INDEX `guest_chat_guest_time_idx` ON `guest_chat` (`guest_id`,`created_at`);