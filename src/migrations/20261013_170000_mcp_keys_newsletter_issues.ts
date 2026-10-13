import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN IF NOT EXISTS "newsletter_issues_find" boolean DEFAULT false;
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN IF NOT EXISTS "newsletter_issues_create" boolean DEFAULT false;
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN IF NOT EXISTS "newsletter_issues_update" boolean DEFAULT false;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" DROP COLUMN IF EXISTS "newsletter_issues_find";
   ALTER TABLE "payload_mcp_api_keys" DROP COLUMN IF EXISTS "newsletter_issues_create";
   ALTER TABLE "payload_mcp_api_keys" DROP COLUMN IF EXISTS "newsletter_issues_update";`)
}
