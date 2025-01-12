CREATE TABLE "newspaper" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "newspaper_email_unique" UNIQUE("email")
);
