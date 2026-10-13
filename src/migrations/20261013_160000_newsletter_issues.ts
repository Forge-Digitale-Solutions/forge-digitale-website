import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "newsletter_issues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"subject" varchar,
  	"web_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE INDEX "newsletter_issues_updated_at_idx" ON "newsletter_issues" USING btree ("updated_at");
  CREATE INDEX "newsletter_issues_created_at_idx" ON "newsletter_issues" USING btree ("created_at");

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "newsletter_issues_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_newsletter_issues_fk" FOREIGN KEY ("newsletter_issues_id") REFERENCES "public"."newsletter_issues"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_newsletter_issues_id_idx" ON "payload_locked_documents_rels" USING btree ("newsletter_issues_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_newsletter_issues_fk";
  DROP INDEX "payload_locked_documents_rels_newsletter_issues_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "newsletter_issues_id";
  DROP TABLE "newsletter_issues" CASCADE;`)
}
