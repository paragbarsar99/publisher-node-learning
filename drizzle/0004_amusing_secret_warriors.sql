CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_author_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;