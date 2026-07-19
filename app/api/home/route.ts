import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { posts } from "../../../db/schema";
import { currentMember } from "../../../lib/access";
import { getChatGPTUser } from "../../chatgpt-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error: "Inicia sesión para consultar los proyectos." }, { status: 401 });
  const member = await currentMember();
  if (!member || member.status !== "active") return Response.json({ error: "Cuenta sin acceso." }, { status: 403 });
  const entries = await getDb()
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      category: posts.category,
      requiredAccessLevel: posts.requiredAccessLevel,
      githubUrl: posts.githubUrl,
      youtubeUrl: posts.youtubeUrl,
      coverImageUrl: posts.coverImageUrl,
      publishedAt: posts.publishedAt,
    })
    .from(posts)
    .where(and(eq(posts.status, "published"), eq(posts.showOnHome, true)))
    .orderBy(desc(posts.publishedAt));

  return Response.json(
    { entries },
    { headers: { "Cache-Control": "no-store" } },
  );
}
