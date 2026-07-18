import { desc, eq } from "drizzle-orm";
import { getDb } from "../../db";
import { posts } from "../../db/schema";
import UserMenu from "../UserMenu";
import ResponsiveImage from "../ResponsiveImage";

export const dynamic = "force-dynamic";
export default async function BlogPage() {
  const entries = await getDb().select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt));
  return <main className="content-page"><header className="content-header"><a href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><nav><a href="/">Inicio</a><a href="/participar">Participar</a><a href="/nosotros">Nosotros</a><UserMenu /></nav></header><section className="content-hero"><span className="kicker">BITÁCORA HAIC</span><h1>Proyectos, decisiones y aprendizaje abierto.</h1><p>El contexto es público. El detalle técnico está disponible para miembros registrados.</p></section><section className="entry-grid">{entries.length ? entries.map(entry => <article className="entry-card" key={entry.id}>{entry.coverImageUrl&&<a className="entry-cover" href={`/blog/${entry.slug}`}><ResponsiveImage src={entry.coverImageUrl} alt={`Portada de ${entry.title}`} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw"/></a>}<div className="entry-card-copy"><span>{entry.category}</span><h2>{entry.title}</h2><p>{entry.excerpt}</p><div><small>Nivel de acceso {entry.requiredAccessLevel}</small><a href={`/blog/${entry.slug}`}>Leer proyecto →</a></div></div></article>) : <div className="empty-state"><b>La primera publicación está en preparación.</b><p>Entra al administrador para crearla y publicarla.</p></div>}</section></main>;
}
