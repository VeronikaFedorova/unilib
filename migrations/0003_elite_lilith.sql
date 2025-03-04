ALTER TABLE "borrow_records" ADD COLUMN "due_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "borrow_records" DROP COLUMN "ddue_date";