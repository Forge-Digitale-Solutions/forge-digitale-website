import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { buildConfig } from "payload";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { migrations } from "./migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    // Dev only. @payloadcms/db-postgres skips push when NODE_ENV=production
    // or PAYLOAD_MIGRATING=true. Local schema changes still sync on `next dev`.
    // Production applies src/migrations before listen (scripts/start-with-migrations.sh)
    // and again on connect via prodMigrations.
    push: true,
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    mcpPlugin({
      collections: {
        posts: {
          description: "Articles du blog Forge Digitale",
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: true,
          },
        },
        media: {
          description: "Images des articles",
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: false,
          },
        },
      },
    }),
  ],
});
