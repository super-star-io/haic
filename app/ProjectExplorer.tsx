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
      {!visibleProjects.length && <div className="empty-state"><b>No hay proyectos destacados en esta categoría.</b><p>Activa “Mostrar en HOME” en una entrada publicada desde el administrador.</p></div>}
    </div>
  </>;
}
