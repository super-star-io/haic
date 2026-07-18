import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { auditLogs, posts } from "../../../../db/schema";
import { canEdit, requireMember, slugify } from "../../../../lib/access";

export async function GET() {
  const member = await requireMember();
  if (!member || !canEdit(member.role)) return Response.json({ error: "Sin permiso." }, { status: 403 });
  return Response.json({ posts: await getDb().select().from(posts).orderBy(desc(posts.updatedAt)) });
}

export async function POST(request: Request) {
  const member = await requireMember();
  if (!member || !canEdit(member.role)) return Response.json({ error: "Sin permiso." }, { status: 403 });
  const body = await request.json() as Record<string, unknown>;
  const title = String(body.title ?? "").trim().slice(0, 180);
  if (!title) return Response.json({ error: "El título es obligatorio." }, { status: 400 });
  const db = getDb(); const now = new Date(); const id = crypto.randomUUID();
  const status = body.status === "published" ? "published" : "draft";
  const [post] = await db.insert(posts).values({ id, title, slug: slugify(String(body.slug || title)), excerpt: String(body.excerpt ?? "").trim(), content: String(body.content ?? "").trim(), category: String(body.category ?? "Proyecto").trim(), status, requiredAccessLevel: Math.max(0, Math.min(100, Number(body.requiredAccessLevel) || 1)), githubUrl: String(body.githubUrl ?? "").trim(), youtubeUrl: String(body.youtubeUrl ?? "").trim(), authorId: member.id, publishedAt: status === "published" ? now : null, createdAt: now, updatedAt: now }).returning();
  await db.insert(auditLogs).values({ id: crypto.randomUUID(), actorId: member.id, action: "post.create", entityType: "post", entityId: id, detail: title, createdAt: now });
  return Response.json({ post }, { status: 201 });
}
