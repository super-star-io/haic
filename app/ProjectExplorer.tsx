"use client";

import { useMemo, useState } from "react";
import type { HomeEntry } from "./HomeContent";
import ResponsiveImage from "./ResponsiveImage";

export default function ProjectExplorer({ projects }: { projects: HomeEntry[] }) {
  const [filter, setFilter] = useState("Todos");
  const filters = useMemo(() => ["Todos", ...Array.from(new Set(projects.map((project) => project.category)))], [projects]);
  const visibleProjects = useMemo(() => projects.filter((project) => filter === "Todos" || project.category === filter), [filter, projects]);

  return <>
    <div className="filter-row" role="group" aria-label="Filtrar proyectos">
      {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
    </div>
    <div className="project-grid">
      {visibleProjects.map((project, index) => <article className={`project-card ${["amber", "blue", "violet"][index % 3]}`} key={project.id}>
        <div className="project-top"><span>{String(index + 1).padStart(2, "0")}</span><span className="status">● Publicado</span></div>
        <div className="project-cover"><ResponsiveImage src={project.coverImageUrl} alt={`Portada de ${project.title}`} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw" /></div>
        <span className="category">MISIÓN · {project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.excerpt}</p>
        <div className="project-purpose"><b>¿Cómo puedes ayudar?</b><span>{project.youtubeUrl ? "Aprende con la clase" : "Conoce el problema"}</span>{project.githubUrl && <span>Mejora la solución</span>}<span>Comparte una idea</span></div>
        <div className="card-footer"><span>{project.requiredAccessLevel > 0 ? "Detalles para miembros" : "Abierto para todos"}</span><a href={`/blog/${project.slug}`} aria-label={`Conocer la misión ${project.title}`}>Conocer la misión →</a></div>
      </article>)}
      {!visibleProjects.length && <section className="project-empty-state" aria-labelledby="projects-coming-title">
        <div className="project-empty-visual" aria-hidden="true">
          <span className="empty-orbit empty-orbit-one" />
          <span className="empty-orbit empty-orbit-two" />
          <span className="empty-core">HAIC</span>
          <i className="empty-node node-one" /><i className="empty-node node-two" /><i className="empty-node node-three" />
        </div>
        <div className="project-empty-copy">
          <span className="kicker">PRIMERAS MISIONES EN PREPARACIÓN</span>
          <h3 id="projects-coming-title">Estamos preparando proyectos que valga la pena construir juntos.</h3>
          <p>Muy pronto encontrarás retos reales de Hidalgo convertidos en clases, repositorios y primeras tareas claras para comenzar a contribuir.</p>
          <div className="project-empty-promises"><span>Clases prácticas</span><span>Problemas reales</span><span>Aportes para todos</span></div>
          <a href="/participar">Descubre cómo podrás participar <span>→</span></a>
        </div>
      </section>}
    </div>
  </>;
}
