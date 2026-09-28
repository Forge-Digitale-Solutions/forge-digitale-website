import pg from "pg";

// Payload records a payload_migrations row (name=dev, batch=-1) when Drizzle
// push runs in development. `payload migrate` then waits for a confirmation
// prompt. Production was bootstrapped with push, so drop only that marker.
// Pending migrations stay additive and run next.
const connectionString = process.env.DATABASE_URI;
if (!connectionString) {
  console.error("DATABASE_URI is required before payload migrate");
  process.exit(1);
}

const client = new pg.Client({ connectionString });
await client.connect();
try {
  const { rows } = await client.query(
    "SELECT to_regclass('public.payload_migrations') AS name",
  );
  if (!rows[0]?.name) process.exit(0);

  const deleted = await client.query(
    "DELETE FROM payload_migrations WHERE name = 'dev' AND batch = -1",
  );
  if (deleted.rowCount) {
    console.log(
      `Removed ${deleted.rowCount} dev push marker(s) from payload_migrations`,
    );
  }
} finally {
  await client.end();
}
