import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { auditLogs, users } from "../../../../../db/schema";
import { canManageUsers, requireMember, type Role } from "../../../../../lib/access";

const roles: Role[] = ["member", "contributor", "editor", "admin", "superadmin"];
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const actor = await requireMember();
  if (!actor || !canManageUsers(actor.role)) return Response.json({ error: "Sin permiso." }, { status: 403 });
  const { id } = await context.params; const body = await request.json() as { role?: Role; accessLevel?: number; status?: "active" | "suspended" };
  if (!body.role || !roles.includes(body.role)) return Response.json({ error: "Rol inválido." }, { status: 400 });
  if (body.role === "superadmin" && actor.role !== "superadmin") return Response.json({ error: "Sólo un superusuario puede crear otro." }, { status: 403 });
  if (id === actor.id && body.status === "suspended") return Response.json({ error: "No puedes suspender tu propia cuenta." }, { status: 400 });
  const db = getDb(); const now = new Date();
  const [user] = await db.update(users).set({ role: body.role, accessLevel: Math.max(0, Math.min(100, Number(body.accessLevel) || 1)), status: body.status === "suspended" ? "suspended" : "active", updatedAt: now }).where(eq(users.id, id)).returning();
  if (!user) return Response.json({ error: "Usuario no encontrado." }, { status: 404 });
  await db.insert(auditLogs).values({ id: crypto.randomUUID(), actorId: actor.id, action: "user.access.update", entityType: "user", entityId: id, detail: `${user.role}:${user.accessLevel}:${user.status}`, createdAt: now });
  return Response.json({ user });
}
