"use client";

import { useMemo, useState } from "react";

const projects = [
  {
    id: "01",
    title: "Visión artificial para comercio local",
    description: "Del dataset a una API capaz de reconocer productos y apoyar el control de inventario.",
    category: "Computer Vision",
    level: "Intermedio",
    status: "En construcción",
    stack: ["Python", "YOLO", "FastAPI"],
    tone: "amber",
  },
  {
    id: "02",
    title: "Predicción de demanda turística",
    description: "Una serie de tiempo reproducible para anticipar ocupación y planear recursos regionales.",
    category: "Machine Learning",
    level: "Inicial",
    status: "Caso publicado",
    stack: ["Pandas", "XGBoost", "Streamlit"],
    tone: "blue",
  },
  {
    id: "03",
    title: "Asistente documental para MiPyMEs",
    description: "RAG en español para consultar manuales, procesos y conocimiento operativo con fuentes.",
    category: "IA Generativa",
    level: "Avanzado",
    status: "Próxima sesión",
    stack: ["LLM", "RAG", "Vector DB"],
    tone: "violet",
  },
];

const filters = ["Todos", "Computer Vision", "Machine Learning", "IA Generativa"];

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "Todos" || project.category === filter),
    [filter],
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="HAIC, inicio">
          <img src="/haic-logo.svg" alt="Hidalgo AI Community" />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#proyectos">Proyectos</a>
          <a href="#sesiones">Sesiones</a>
          <a href="#aprender">Aprender</a>
          <a href="#comunidad">Comunidad</a>
        </nav>
        <a className="header-cta" href="#contribuir">Contribuir <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Conocimiento abierto desde Hidalgo</div>
          <h1>IA real.<br /><em>Impacto local.</em></h1>
          <p>Aprende construyendo proyectos de inteligencia artificial y machine learning basados en retos reales de nuestra comunidad.</p>
          <div className="hero-actions">
            <a className="button primary" href="#proyectos">Explorar proyectos <span>→</span></a>
            <a className="button secondary" href="#sesiones"><span className="play">▶</span> Ver última sesión</a>
          </div>
          <div className="hero-proof">
            <div><strong>03</strong><span>proyectos abiertos</span></div>
            <div><strong>01</strong><span>sesión publicada</span></div>
            <div><strong>∞</strong><span>formas de aportar</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Flujo de conocimiento HAIC">
          <div className="grid-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="core"><img src="/haic-icon.svg" alt="" /></div>
          <div className="float-card card-data"><span>01</span><b>DATOS</b><small>Problema local</small></div>
          <div className="float-card card-model"><span>02</span><b>MODELO</b><small>Práctica abierta</small></div>
          <div className="float-card card-impact"><span>03</span><b>IMPACTO</b><small>Solución compartida</small></div>
        </div>
      </section>

      <section className="section projects" id="proyectos">
        <div className="section-heading">
          <div><span className="kicker">LABORATORIO ABIERTO</span><h2>Proyectos que se pueden<br />entender, usar y mejorar.</h2></div>
          <p>Cada caso conecta una clase grabada, una guía paso a paso y un repositorio listo para recibir contribuciones.</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filtrar proyectos">
          {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className={`project-card ${project.tone}`} key={project.id}>
              <div className="project-top"><span>{project.id}</span><span className="status">● {project.status}</span></div>
              <div className="project-signal"><i /><i /><i /><i /><i /></div>
              <span className="category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="card-footer"><span>{project.level}</span><a href="#contribuir" aria-label={`Abrir ${project.title}`}>Abrir proyecto →</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section session" id="sesiones">
        <div className="session-media">
          <span className="live-label">SESIÓN 01 · 48 MIN</span>
          <button aria-label="Reproducir sesión">▶</button>
          <div className="terminal-lines"><span>dataset.ready</span><span>model.training</span><span>community.learning</span></div>
        </div>
        <div className="session-copy">
          <span className="kicker">APRENDE EN COMUNIDAD</span>
          <h2>De cero a un modelo que resuelve algo real.</h2>
          <p>Las sesiones no son demostraciones aisladas. Son el punto de entrada a un proyecto vivo: puedes reproducirlo, cuestionarlo y proponer la siguiente mejora.</p>
          <ul><li><span>01</span>Contexto y reto de Hidalgo</li><li><span>02</span>Construcción guiada del modelo</li><li><span>03</span>Publicación y siguientes issues</li></ul>
          <a href="#aprender">Ver ruta de esta sesión <span>→</span></a>
        </div>
      </section>

      <section className="section pathway" id="aprender">
        <div className="section-heading"><div><span className="kicker">UNA RUTA, NO UN MANUAL</span><h2>Entra por donde quieras.</h2></div><p>Todo el contenido comparte la misma estructura para que siempre sepas qué aprender y qué hacer después.</p></div>
        <div className="steps">
          <article><span>01</span><b>MIRA</b><h3>Sesión en YouTube</h3><p>Comprende el problema y acompaña la construcción.</p><i>48 min</i></article>
          <article><span>02</span><b>ENTIENDE</b><h3>Artículo técnico</h3><p>Profundiza en decisiones, datos, límites y resultados.</p><i>12 min</i></article>
          <article><span>03</span><b>CONSTRUYE</b><h3>Repositorio abierto</h3><p>Ejecuta el proyecto y revisa su arquitectura.</p><i>GitHub</i></article>
          <article><span>04</span><b>APORTA</b><h3>Issue comunitario</h3><p>Mejora código, datos, documentación o alcance.</p><i>Open source</i></article>
        </div>
      </section>

      <section className="community" id="comunidad">
        <div><span className="kicker">HIDALGO AI COMMUNITY</span><h2>El conocimiento crece<br />cuando circula.</h2></div>
        <div className="community-copy"><p>HAIC conecta estudiantes, profesionales, organizaciones y curiosos para convertir retos cercanos en aprendizaje abierto.</p><a className="button light" href="#contribuir">Quiero ser parte <span>→</span></a></div>
      </section>

      <section className="contribute" id="contribuir">
        <span className="kicker">TU SIGUIENTE PULL REQUEST EMPIEZA AQUÍ</span>
        <h2>¿Qué puedes aportar?</h2>
        <div className="contribution-list"><span>código</span><span>datos</span><span>documentación</span><span>un reto local</span></div>
        <p>Explora un proyecto, elige un issue etiquetado como <code>good first issue</code> y construye con la comunidad.</p>
        <a className="button primary" href="https://github.com" target="_blank" rel="noreferrer">Explorar en GitHub ↗</a>
      </section>

      <footer><img src="/haic-logo.svg" alt="Hidalgo AI Community" /><p>IA abierta. Talento local. Impacto compartido.</p><div><a href="#proyectos">Proyectos</a><a href="#sesiones">YouTube</a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div><small>© 2026 HAIC · Hecho en Hidalgo, México</small></footer>
    </main>
  );
}
