//setups the actual database connection
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "./config.js";

const client = postgres(config.DATABASE_URL);
//attach the drizzle client to the postgres client to use drizzle-orm features like transactions, migrations, etc.
export const db = drizzle(client);

export async function withTransaction<T>(
  fn: (tx: Parameters<Parameters<typeof db.transaction>[0]>[0]) => Promise<T>,
): Promise<T> {
  return db.transaction(fn);
}
//A transaction means: run several DB operations as one all-or-nothing unit — 
// either they all succeed and get saved, or if anything fails partway through, everything gets rolled back as if none of it happened.