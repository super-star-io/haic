import postgres from "postgres";

const email = process.argv[2]?.trim().toLowerCase();
if (!email || !email.includes("@")) throw new Error("Usage: npm run admin:promote -- user@example.com");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
try {
  const rows = await sql`update users set role='superadmin', access_level=100, status='active', updated_at=now() where lower(email)=${email} returning id, email, role, access_level`;
  if (!rows.length) throw new Error(`No user exists with email ${email}. Register it first.`);
  console.log(`Promoted ${rows[0].email} to superadmin with access level 100.`);
} finally {
  await sql.end();
}
