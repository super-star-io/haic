import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { auditLogs, posts } from "../../../../../db/schema";
import { canEdit, requireMember, slugify } from "../../../../../lib/access";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const member = await requireMember();
  if (!member || !canEdit(member.role)) return Response.json({ error: "Sin permiso." }, { status: 403 });
  const { id } = await context.params; const body = await request.json() as Record<string, unknown>; const db = getDb(); const now = new Date();
  const title = String(body.title ?? "").trim().slice(0, 180);
  if (!title) return Response.json({ error: "El título es obligatorio." }, { status: 400 });
  const status = body.status === "published" ? "published" : body.status === "archived" ? "archived" : "draft";
  const [post] = await db.update(posts).set({ title, slug: slugify(String(body.slug || title)), excerpt: String(body.excerpt ?? "").trim(), content: String(body.content ?? "").trim(), category: String(body.category ?? "Proyecto").trim(), status, requiredAccessLevel: Math.max(0, Math.min(100, Number(body.requiredAccessLevel) || 1)), githubUrl: String(body.githubUrl ?? "").trim(), youtubeUrl: String(body.youtubeUrl ?? "").trim(), publishedAt: status === "published" ? now : null, updatedAt: now }).where(eq(posts.id, id)).returning();
  if (!post) return Response.json({ error: "Entrada no encontrada." }, { status: 404 });
  await db.insert(auditLogs).values({ id: crypto.randomUUID(), actorId: member.id, action: "post.update", entityType: "post", entityId: id, detail: title, createdAt: now });
  return Response.json({ post });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const member = await requireMember();
  if (!member || !canEdit(member.role)) return Response.json({ error: "Sin permiso." }, { status: 403 });
  const { id } = await context.params; const db = getDb();
  const [post] = await db.update(posts).set({ status: "archived", updatedAt: new Date() }).where(eq(posts.id, id)).returning();
  return post ? Response.json({ post }) : Response.json({ error: "Entrada no encontrada." }, { status: 404 });
}
