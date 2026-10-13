import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "credit_name" varchar;
   ALTER TABLE "media" ADD COLUMN "credit_url" varchar;
   ALTER TABLE "media" ADD COLUMN "source_url" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DROP COLUMN "credit_name";
   ALTER TABLE "media" DROP COLUMN "credit_url";
   ALTER TABLE "media" DROP COLUMN "source_url";`)
}
