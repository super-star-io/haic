import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { users } from "../../../../db/schema";
import { canManageUsers, requireMember } from "../../../../lib/access";

export async function GET() {
  const member = await requireMember();
  if (!member || !canManageUsers(member.role)) return Response.json({ error: "Sin permiso." }, { status: 403 });
  return Response.json({ users: await getDb().select().from(users).orderBy(desc(users.createdAt)) });
}
