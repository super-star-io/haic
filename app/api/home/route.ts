import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { posts } from "../../../db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
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
