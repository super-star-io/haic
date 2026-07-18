import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { getDb } from "../../../db";
import { posts } from "../../../db/schema";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { currentMember } from "../../../lib/access";
import { youtubeEmbedUrl } from "../../../lib/youtube";
import ProjectHero from "./ProjectHero";
import YoutubeLite from "../../YoutubeLite";

export const dynamic = "force-dynamic";
export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const [entry] = await getDb().select().from(posts).where(and(eq(posts.slug, slug), eq(posts.status, "published"))).limit(1); if (!entry) notFound();
  if (entry.requiredAccessLevel > 0) { await requireChatGPTUser(`/blog/${slug}`); const member = await currentMember(); if (!member) redirect("/registro"); if (member.status !== "active" || member.accessLevel < entry.requiredAccessLevel) return <main className="portal-shell"><section className="auth-card"><span className="kicker">ACCESO RESTRINGIDO</span><h1>Este proyecto requiere nivel {entry.requiredAccessLevel}.</h1><p>Tu acceso actual es nivel {member.accessLevel}. Participa en la comunidad o solicita acceso a un administrador.</p><a className="button primary" href="/perfil">Volver a mi perfil</a></section></main>; }
  const videoEmbedUrl = youtubeEmbedUrl(entry.youtubeUrl);
  return <main className="article-page"><header><a href="/blog">← Todas las publicaciones</a><a href="/perfil">Mi cuenta</a></header>{entry.coverImageUrl&&<ProjectHero imageUrl={entry.coverImageUrl} title={entry.title}/>}<article><span className="kicker">{entry.category}</span><h1>{entry.title}</h1><p className="lead">{entry.excerpt}</p>{videoEmbedUrl&&<section className="article-video" aria-labelledby="class-video-title"><div className="article-video-heading"><span className="kicker">CLASE GRABADA</span><h2 id="class-video-title">Mira la sesión sin salir de HAIC.</h2></div><YoutubeLite url={entry.youtubeUrl} title={`Clase: ${entry.title}`} posterImage={entry.coverImageUrl}/></section>}<div className="article-body">{entry.content.split("\n").map((paragraph, index) => paragraph.trim() ? <p key={index}>{paragraph}</p> : null)}</div><aside>{entry.githubUrl && <a href={entry.githubUrl} target="_blank" rel="noreferrer">Repositorio GitHub ↗</a>}{entry.youtubeUrl && <a href={entry.youtubeUrl} target="_blank" rel="noreferrer">Abrir en YouTube ↗</a>}</aside></article></main>;
}
