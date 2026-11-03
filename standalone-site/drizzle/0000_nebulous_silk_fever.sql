CREATE TABLE `guest_presence` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`room` text NOT NULL,
	`payload` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `guest_presence_token_idx` ON `guest_presence` (`token`);--> statement-breakpoint
CREATE INDEX `guest_presence_room_time_idx` ON `guest_presence` (`room`,`updated_at`);--> statement-breakpoint
CREATE INDEX `guest_presence_time_idx` ON `guest_presence` (`updated_at`);