import { DatabaseSync } from "node:sqlite";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function findSqlite(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const candidate = path.join(dir, entry.name);
    if (entry.isDirectory()) { const found = await findSqlite(candidate); if (found) return found; }
    if (entry.isFile() && entry.name.endsWith(".sqlite")) {
      const db = new DatabaseSync(candidate, { readOnly: true });
      const hasUsers = db.prepare("select 1 from sqlite_master where type='table' and name='users'").get();
      db.close();
      if (hasUsers) return candidate;
    }
  }
  return null;
}

const sqlitePath = process.argv[2] ?? await findSqlite(path.resolve(".wrangler/state/v3/d1"));
if (!sqlitePath) throw new Error("No local D1 database was found. You may pass its path as the first argument.");
const outputPath = path.resolve(process.argv[3] ?? "outputs/haic-d1-export.json");
const db = new DatabaseSync(sqlitePath, { readOnly: true });
const all = (table) => db.prepare(`select * from ${table}`).all();
const accounts = all("accounts").map((row) => ({ ...row, access_token: null, refresh_token: null, id_token: null }));
const payload = { version: 1, exportedAt: new Date().toISOString(), source: "cloudflare-d1-local", users: all("users"), accounts, posts: all("posts"), auditLogs: all("audit_logs") };
db.close();
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, { mode: 0o600 });
console.log(`Exported ${payload.users.length} users and ${payload.posts.length} posts to ${outputPath}. Sessions and OAuth tokens were excluded.`);
