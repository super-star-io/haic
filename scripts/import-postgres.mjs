import { readFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");
const inputPath = path.resolve(process.argv[2] ?? "outputs/haic-d1-export.json");
const payload = JSON.parse(await readFile(inputPath, "utf8"));
if (payload.version !== 1) throw new Error("Unsupported export version.");
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const dateColumns = new Set(["created_at", "updated_at", "published_at", "expires_at", "access_token_expires_at", "refresh_token_expires_at"]);
const booleanColumns = new Set(["email_verified", "show_on_home"]);
const legacyRoles = new Set(["member", "contributor", "editor"]);
const normalize = (rows) => rows.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => {
  if (dateColumns.has(key) && value != null) { const numeric = Number(value); return [key, new Date(numeric < 1e12 ? numeric * 1000 : numeric).toISOString()]; }
  if (booleanColumns.has(key) && value != null) return [key, Boolean(value)];
  if (key === "role" && legacyRoles.has(value)) return [key, "standard"];
  return [key, value];
})));

try {
  await sql.begin(async (tx) => {
    const users = normalize(payload.users ?? []); if (users.length) await tx`insert into users ${tx(users)} on conflict do nothing`;
    const accounts = normalize(payload.accounts ?? []); if (accounts.length) await tx`insert into accounts ${tx(accounts)} on conflict do nothing`;
    const posts = normalize(payload.posts ?? []); if (posts.length) await tx`insert into posts ${tx(posts)} on conflict do nothing`;
    const auditLogs = normalize(payload.auditLogs ?? []); if (auditLogs.length) await tx`insert into audit_logs ${tx(auditLogs)} on conflict do nothing`;
  });
  console.log(`Imported ${payload.users?.length ?? 0} users and ${payload.posts?.length ?? 0} posts. Existing IDs were preserved.`);
} finally {
  await sql.end();
}
