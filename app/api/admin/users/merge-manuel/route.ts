import { eq, sql } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { accounts, auditLogs, posts, sessions, users } from "../../../../../db/schema";
import { requireMember } from "../../../../../lib/access";

const preservedEmail = "n.manuelcamacho@gmail.com";
const expectedName = "manuelantoniocamachoreyes";

function normalizeName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").replace(/[^a-z0-9]/g, "");
}

export async function POST(request: Request) {
  const actor = await requireMember();
  if (!actor || actor.role !== "superadmin") return Response.json({ error: "Solo un superadministrador puede fusionar cuentas." }, { status: 403 });

  let body: { duplicateId?: string; confirmation?: string };
  try {
    body = await request.json() as typeof body;
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (!body.duplicateId || body.confirmation?.trim().toLocaleLowerCase("en-US") !== preservedEmail) {
    return Response.json({ error: `Confirma escribiendo ${preservedEmail}.` }, { status: 400 });
  }

  const db = getDb();
  const result = await db.transaction(async (tx) => {
    const [target] = await tx.select().from(users).where(sql`lower(${users.email}) = ${preservedEmail}`).limit(1);
    const [duplicate] = await tx.select().from(users).where(eq(users.id, body.duplicateId!)).limit(1);
    if (!target) return { error: `No se encontró la cuenta que se conservará (${preservedEmail}).`, status: 404 as const };
    if (!duplicate) return { error: "No se encontró la cuenta duplicada.", status: 404 as const };
    if (target.id === duplicate.id) return { error: "La cuenta seleccionada ya es la cuenta que se conservará.", status: 400 as const };
    if (normalizeName(target.name) !== expectedName || normalizeName(duplicate.name) !== expectedName) {
      return { error: "La fusión se bloqueó porque los nombres no coinciden con Manuel Antonio Camacho Reyes.", status: 400 as const };
    }

    const now = new Date();
    await tx.update(sessions).set({ userId: target.id, updatedAt: now }).where(eq(sessions.userId, duplicate.id));
    await tx.update(accounts).set({ userId: target.id, updatedAt: now }).where(eq(accounts.userId, duplicate.id));
    await tx.update(posts).set({ authorId: target.id }).where(eq(posts.authorId, duplicate.id));
    await tx.update(auditLogs).set({ actorId: target.id }).where(eq(auditLogs.actorId, duplicate.id));
    await tx.update(users).set({
      image: target.image ?? duplicate.image,
      organization: target.organization || duplicate.organization,
      bio: target.bio || duplicate.bio,
      updatedAt: now,
    }).where(eq(users.id, target.id));
    await tx.delete(users).where(eq(users.id, duplicate.id));
    await tx.insert(auditLogs).values({
      id: crypto.randomUUID(),
      actorId: actor.id,
      action: "user.merge",
      entityType: "user",
      entityId: target.id,
      detail: `Consolidada la cuenta duplicada ${duplicate.email} en ${target.email}.`,
      createdAt: now,
    });
    return { targetName: target.name, targetEmail: target.email, mergedEmail: duplicate.email };
  });

  if ("error" in result) return Response.json({ error: result.error }, { status: result.status });
  return Response.json({ merged: true, ...result });
}
