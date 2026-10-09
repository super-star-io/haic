import { notFound } from "next/navigation";
import { teamMembers } from "../../../lib/team";
import ResponsiveImage from "../../ResponsiveImage";

export function generateStaticParams() {
  return teamMembers.map(({ slug }) => ({ slug }));
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = teamMembers.find((person) => person.slug === slug);
  if (!member) notFound();

  return <main className="person-page"><header className="content-header"><a href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><nav><a href="/">Inicio</a><a href="/blog">Proyectos</a><a href="/nosotros">Nosotros</a></nav></header><div className="person-profile"><a className="person-back" href="/nosotros">← Todas las personas</a><section className="person-card"><div className="person-photo"><ResponsiveImage src={member.imageUrl} alt={member.imageAlt ?? `Retrato de ${member.name}`} loading="eager" sizes="(max-width: 760px) 90vw, 360px" kind="team" /></div><div className="person-details"><span className="kicker">PERSONAS DETRÁS DE HAIC</span><h1>{member.name}</h1><strong>{member.role}</strong><p className="person-education">{member.education}</p><p>{member.description}</p>{member.linkedinUrl && <a className="button primary" href={member.linkedinUrl} target="_blank" rel="noreferrer">Ver perfil de LinkedIn <span>↗</span></a>}<div className="person-projects"><span className="kicker">PROYECTOS</span><p>Los proyectos en los que participa se irán mostrando aquí conforme se asignen.</p></div></div></section></div></main>;
}
