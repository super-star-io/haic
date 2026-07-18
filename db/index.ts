import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { getRuntimeEnv } from "../lib/env";

const globalDatabase = globalThis as typeof globalThis & { haicPostgres?: ReturnType<typeof postgres> };

export function getDb() {
  const env = getRuntimeEnv();
  const client = globalDatabase.haicPostgres ?? postgres(env.databaseUrl, { max: 10, idle_timeout: 20, connect_timeout: 10 });
  globalDatabase.haicPostgres = client;
  return drizzle(client, { schema });
}
