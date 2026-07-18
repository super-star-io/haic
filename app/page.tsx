import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../db";
import { posts } from "../db/schema";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const initialProjects = await getDb()
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
    })
    .from(posts)
    .where(and(eq(posts.status, "published"), eq(posts.showOnHome, true)))
    .orderBy(desc(posts.publishedAt));

  return <HomeContent initialProjects={initialProjects} />;
}
