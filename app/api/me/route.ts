import { eq } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { users } from "../../../db/schema";
import { bootstrapRole } from "../../../lib/access";

export async function GET() {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Inicia sesión para continuar." }, { status: 401 });
  const [user] = await getDb().select().from(users).where(eq(users.email, identity.email.toLowerCase())).limit(1);
  return Response.json({ identity, user: user ?? null });
}

export async function POST(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Identidad no verificada." }, { status: 401 });
  const body = await request.json() as { name?: string; organization?: string; bio?: string };
  const name = body.name?.trim().slice(0, 100) || identity.displayName;
  const email = identity.email.toLowerCase();
  const now = new Date();
  const db = getDb();
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing) {
    const bootstrap = bootstrapRole(email);
    const [user] = await db.update(users).set({ name, organization: body.organization?.trim().slice(0, 120) ?? existing.organization, bio: body.bio?.trim().slice(0, 500) ?? existing.bio, role: bootstrap === "superadmin" && existing.role === "standard" ? "superadmin" : existing.role, accessLevel: bootstrap === "superadmin" && existing.role === "standard" ? 100 : existing.accessLevel, updatedAt: now }).where(eq(users.id, existing.id)).returning();
    return Response.json({ user });
  }
  const role = bootstrapRole(email);
  const [user] = await db.insert(users).values({ id: crypto.randomUUID(), email, name, organization: body.organization?.trim().slice(0, 120) ?? "", bio: body.bio?.trim().slice(0, 500) ?? "", role, accessLevel: role === "superadmin" ? 100 : 1, status: "active", createdAt: now, updatedAt: now }).returning();
  return Response.json({ user }, { status: 201 });
}
