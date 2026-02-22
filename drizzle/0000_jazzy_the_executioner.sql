CREATE TABLE "author" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"lastName" varchar(50),
	"emailId" varchar(255) NOT NULL,
	"phoneNumber" integer,
	"password" text,
	CONSTRAINT "author_emailId_unique" UNIQUE("emailId")
);
--> statement-breakpoint
CREATE TABLE "book" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"name_search" "tsvector" GENERATED ALWAYS AS (to_tsvector('english',"book"."name")) STORED NOT NULL,
	"discription" text,
	"price" numeric,
	"authorId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "book" ADD CONSTRAINT "book_authorId_author_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_name_search" ON "book" USING gin ("name_search");