import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { auditLogs, posts } from "../../../../db/schema";
import { canCreatePosts, requireMember, slugify } from "../../../../lib/access";
import { normalizeProjectImage } from "../../../../lib/project-image";
import { youtubeVideoId } from "../../../../lib/youtube";

export async function POST(request: Request) {
  const member = await requireMember();
  if (!member || !canCreatePosts(member.role)) return Response.json({ error: "Solo los contribuidores pueden enviar entradas." }, { status: 403 });

  const body = await request.json() as Record<string, unknown>;
  const title = String(body.title ?? "").trim().slice(0, 180);
  const content = String(body.content ?? "").trim().slice(0, 50_000);
  if (!title) return Response.json({ error: "El título es obligatorio." }, { status: 400 });
  if (!content) return Response.json({ error: "Agrega el contenido de la entrada." }, { status: 400 });

  const rawCover = String(body.coverImageUrl ?? "").trim();
  const coverImageUrl = rawCover ? normalizeProjectImage(rawCover) : "";
  if (rawCover && !coverImageUrl) return Response.json({ error: "La portada debe ser una imagen local de HAIC o una URL HTTPS válida." }, { status: 400 });
  const githubUrl = String(body.githubUrl ?? "").trim().slice(0, 500);
  if (githubUrl) {
    try { if (new URL(githubUrl).protocol !== "https:") throw new Error(); }
    catch { return Response.json({ error: "El enlace de GitHub debe usar HTTPS." }, { status: 400 }); }
  }
  const youtubeUrl = String(body.youtubeUrl ?? "").trim().slice(0, 500);
  if (youtubeUrl && !youtubeVideoId(youtubeUrl)) return Response.json({ error: "Agrega una URL válida de YouTube." }, { status: 400 });

  const db = getDb();
  const now = new Date();
  const id = crypto.randomUUID();
  const requestedSlug = slugify(String(body.slug || title)) || "entrada";
  const [duplicate] = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, requestedSlug)).limit(1);
  const slug = duplicate ? `${requestedSlug.slice(0, 72)}-${id.slice(0, 7)}` : requestedSlug;
  const [post] = await db.insert(posts).values({
    id,
    title,
    slug,
    excerpt: String(body.excerpt ?? "").trim().slice(0, 500),
    content,
    category: String(body.category ?? "Artículo").trim().slice(0, 60) || "Artículo",
    status: "draft",
    requiredAccessLevel: 1,
    githubUrl,
    youtubeUrl,
    coverImageUrl: coverImageUrl || "",
    showOnHome: false,
    authorId: member.id,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
  }).returning();
  await db.insert(auditLogs).values({ id: crypto.randomUUID(), actorId: member.id, action: "post.submit", entityType: "post", entityId: id, detail: title, createdAt: now });
  return Response.json({ post }, { status: 201 });
}
