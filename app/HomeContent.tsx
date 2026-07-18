import UserMenu from "./UserMenu";
import YoutubeLite from "./YoutubeLite";
import ProjectExplorer from "./ProjectExplorer";

export type HomeEntry = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  requiredAccessLevel: number;
  githubUrl: string;
  youtubeUrl: string;
  coverImageUrl: string;
};

export default function Home({ initialProjects = [] }: { initialProjects?: HomeEntry[] }) {
  const projects = initialProjects;
  const latestSession = projects.find((project) => project.youtubeUrl);

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
          <a href="/participar">Participar</a>
          <a href="/nosotros">Nosotros</a>
          <a href="#comunidad">Comunidad</a>
        </nav>
        <UserMenu />
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Conocimiento abierto desde Hidalgo</div>
          <h1>IA real.<br /><em>Impacto local.</em></h1>
          <p>Aprende construyendo proyectos de inteligencia artificial y machine learning basados en retos reales de nuestra comunidad.</p>
          <div className="hero-actions">
            <a className="button primary" href="#proyectos">Explorar proyectos <span>→</span></a>
            <a className="button secondary" href={latestSession?.youtubeUrl || "#sesiones"} target={latestSession ? "_blank" : undefined} rel={latestSession ? "noreferrer" : undefined}><span className="play">▶</span> Ver última sesión</a>
          </div>
          <div className="hero-proof">
            <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>proyectos abiertos</span></div>
            <div><strong>{String(projects.filter((project) => project.youtubeUrl).length).padStart(2, "0")}</strong><span>sesiones publicadas</span></div>
            <div><strong>∞</strong><span>formas de aportar</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Flujo de conocimiento HAIC">
          <div className="grid-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="neural-net" aria-hidden="true">
            <div className="neural-edges">{Array.from({ length: 14 }, (_, index) => <i className={`edge-${index + 1}`} key={index} />)}</div>
            <div className="neural-nodes">{Array.from({ length: 10 }, (_, index) => <span className={`node-${index + 1}`} key={index} />)}</div>
          </div>
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
        <ProjectExplorer projects={projects} />
      </section>

      <section className="section session" id="sesiones">
        <div className="session-media">
          <span className="live-label">SESIÓN 01 · 48 MIN</span>
          {latestSession ? <YoutubeLite url={latestSession.youtubeUrl} title={`Sesión destacada: ${latestSession.title}`} posterImage={latestSession.coverImageUrl} className="home-video-lite" /> : <><span className="session-play" aria-hidden="true">▶</span><div className="terminal-lines"><span>dataset.ready</span><span>model.training</span><span>community.learning</span></div></>}
        </div>
        <div className="session-copy">
          <span className="kicker">APRENDE EN COMUNIDAD</span>
          <h2>{latestSession?.title || "De cero a un modelo que resuelve algo real."}</h2>
          <p>{latestSession?.excerpt || "Las sesiones no son demostraciones aisladas. Son el punto de entrada a un proyecto vivo: puedes reproducirlo, cuestionarlo y proponer la siguiente mejora."}</p>
          <ul><li><span>01</span>Contexto y reto de Hidalgo</li><li><span>02</span>Construcción guiada del modelo</li><li><span>03</span>Publicación y siguientes issues</li></ul>
          <a href={latestSession ? `/blog/${latestSession.slug}` : "#aprender"}>Ver ruta de esta sesión <span>→</span></a>
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
        <div className="hero-actions centered"><a className="button primary" href="/blog">Explorar publicaciones →</a><a className="button secondary" href="/registro">Crear cuenta</a></div>
      </section>

      <footer><img src="/haic-logo.svg" alt="Hidalgo AI Community" /><p>IA abierta. Talento local. Impacto compartido.</p><div><a href="#proyectos">Proyectos</a><a href="#sesiones">YouTube</a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></div><small>© 2026 HAIC · Hecho en Hidalgo, México</small></footer>
    </main>
  );
}
