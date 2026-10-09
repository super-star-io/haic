import UserMenu from "../UserMenu";
import { teamMembers } from "../../lib/team";
import ResponsiveImage from "../ResponsiveImage";

export default function AboutPage() {
  return <main className="about-page">
    <header className="content-header"><a href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><nav><a href="/">Inicio</a><a href="/blog">Blog</a><a href="/participar">Participar</a><UserMenu /></nav></header>
    <section className="about-page-hero"><span className="kicker">HIDALGO AI COMMUNITY</span><h1>Construimos inteligencia<br/><em>con propósito.</em></h1><p>Somos desarrolladores de sistemas inteligentes. Combinamos ingeniería de software, formación en inteligencia artificial y aprendizaje comunitario para convertir problemas reales en proyectos abiertos y reproducibles.</p></section>
    <section className="about-page-team" aria-labelledby="team-title"><div className="about-page-heading"><span className="kicker">QUIÉNES CONSTRUIMOS HAIC</span><h2 id="team-title">Personas detrás de los proyectos.</h2><p>Diseñamos, experimentamos y compartimos lo aprendido para que más personas puedan entender la inteligencia artificial construyéndola.</p></div>
      <div className="team-grid">{teamMembers.map((member,index)=><article className="team-card" key={member.name}><div className="team-photo"><ResponsiveImage src={member.imageUrl} alt={member.imageAlt ?? `Retrato de ${member.name}`} loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" kind="team"/><span>{String(index+1).padStart(2,"0")}</span></div><div className="team-card-copy"><span className="team-education">{member.education}</span><h3>{member.name}</h3><strong>{member.role}</strong><p>{member.description}</p>{member.linkedinUrl && <a className="people-link" href={member.linkedinUrl} target="_blank" rel="noreferrer">Ver perfil de LinkedIn <span>↗</span></a>}<div className="team-focus"><i/> Ingeniería <i/> Inteligencia artificial <i/> Comunidad</div></div></article>)}</div>
    </section>
    <section className="about-page-cta"><span className="kicker">CONSTRUYE CON NOSOTROS</span><h2>El siguiente proyecto puede comenzar con un reto de tu comunidad.</h2><div><a className="button primary" href="/blog">Explorar proyectos →</a><a className="button secondary" href="/registro">Crear cuenta</a></div></section>
    <footer><img src="/haic-logo.svg" alt="Hidalgo AI Community"/><p>IA abierta. Talento local. Impacto compartido.</p><small>© 2026 HAIC · Hecho en Hidalgo, México</small></footer>
  </main>;
}
