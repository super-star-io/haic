import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "../../db";
import { posts } from "../../db/schema";
import { currentMember, roleLabels, type Role } from "../../lib/access";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import ThemePreference from "./ThemePreference";
import ContributionCalendar from "./ContributionCalendar";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  await requireChatGPTUser("/perfil");
  const member = await currentMember();
  if (!member) redirect("/registro");

  const publishedProjects = await getDb().select().from(posts).where(and(eq(posts.authorId, member.id), eq(posts.status, "published"))).orderBy(desc(posts.publishedAt));
  const initial = member.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  return <main className="profile-dashboard">
    <header className="profile-topbar"><a className="portal-brand" href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><nav><a href="/blog">Proyectos</a><a href="/nosotros">Comunidad</a><a href="/perfil">Mi perfil</a></nav><a className="profile-logout" href={chatGPTSignOutPath("/")}>Cerrar sesión</a></header>
    <div className="profile-layout">
      <aside className="profile-sidebar"><div className="profile-avatar">{member.image ? <img src={member.image} alt="" /> : initial}</div><h1>{member.name}</h1><p>{member.bio || "Integrante de la comunidad HAIC."}</p><span className="profile-meta">{member.email}</span><span className="profile-meta">{roleLabels[member.role as Role]} · nivel {member.accessLevel}</span>{member.organization && <span className="profile-meta">{member.organization}</span>}{["admin", "superadmin"].includes(member.role) && <a className="profile-edit-link" href="/admin">Administrar HAIC →</a>}</aside>
      <div className="profile-main"><section className="profile-repositories"><div className="profile-section-heading"><div><span className="kicker">TRABAJO COMPARTIDO</span><h2>Proyectos publicados</h2></div><a href="/blog">Explorar todos →</a></div>{publishedProjects.length ? <div className="profile-project-grid">{publishedProjects.map((project) => <a className="profile-project" href={`/blog/${project.slug}`} key={project.id}><div><span>{project.category}</span><span className="profile-public-badge">Publicado</span></div><h3>{project.title}</h3><p>{project.excerpt}</p><small>{project.publishedAt ? new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeZone: "UTC" }).format(project.publishedAt) : "Publicación HAIC"}</small></a>)}</div> : <div className="profile-empty"><b>Aún no tienes proyectos publicados.</b><p>Cuando publiques un proyecto desde HAIC aparecerá aquí junto con su actividad.</p><a href="/blog">Ver proyectos de HAIC →</a></div>}</section>
        <ContributionCalendar contributionDates={publishedProjects.flatMap((project) => project.publishedAt ? [project.publishedAt.toISOString().slice(0, 10)] : [])} />
        <ThemePreference initialTheme={member.theme} />
      </div>
    </div>
  </main>;
}
