import UserMenu from "./UserMenu";
import YoutubeLite from "./YoutubeLite";
import ProjectExplorer from "./ProjectExplorer";
import ResponsiveImage from "./ResponsiveImage";
import { teamMembers } from "../lib/team";

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

export default function Home({ initialProjects = [], hasProjectAccess = false }: { initialProjects?: HomeEntry[]; hasProjectAccess?: boolean }) {
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
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#personas">Personas</a>
          <a href="/participar">Participar</a>
          <a href="/nosotros">Nosotros</a>
        </nav>
        <UserMenu />
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Un lugar para aprender, construir y ayudar</div>
          <h1>Tecnología que<br /><em>mejora vidas.</em></h1>
          <p>Aprende inteligencia artificial colaborando en proyectos reales junto a estudiantes, desarrolladores, docentes y profesionales de Hidalgo.</p>
          <div className="hero-actions">
            <a className="button primary" href="#primer-aporte">Empieza a contribuir <span>→</span></a>
            <a className="button secondary" href="#proyectos">Encuentra un proyecto para ti</a>
          </div>
          {hasProjectAccess ? <div className="hero-proof">
            <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>proyectos abiertos</span></div>
            <div><strong>{String(projects.filter((project) => project.youtubeUrl).length).padStart(2, "0")}</strong><span>sesiones publicadas</span></div>
            <div><strong>∞</strong><span>formas de aportar</span></div>
          </div> : <div className="member-access-note"><b>El conocimiento de los proyectos es para miembros HAIC.</b><span>Inicia sesión o crea una cuenta gratuita para continuar.</span></div>}
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
          <div className="float-card card-data"><span>01</span><b>PERSONAS</b><small>Un reto cercano</small></div>
          <div className="float-card card-model"><span>02</span><b>APRENDER</b><small>Construir juntos</small></div>
          <div className="float-card card-impact"><span>03</span><b>IMPACTO</b><small>Ayudar de verdad</small></div>
        </div>
      </section>

      <section className="section how-it-works" id="como-funciona">
        <div className="section-heading"><div><span className="kicker">HAIC EN 20 SEGUNDOS</span><h2>Aprende haciendo algo<br />que importa.</h2></div><p>No somos solamente una academia. Somos un lugar donde las personas aprenden mientras construyen soluciones para otras personas.</p></div>
        <div className="human-steps">
          <article><span aria-hidden="true">▶</span><b>01 · APRENDE</b><h3>Mira una clase breve</h3><p>Comprende un problema real y descubre una forma práctica de abordarlo.</p></article>
          <i aria-hidden="true">→</i>
          <article><span aria-hidden="true">⌘</span><b>02 · CONSTRUYE</b><h3>Mejora una solución</h3><p>Elige una tarea clara y aporta código, diseño, pruebas, datos o documentación.</p></article>
          <i aria-hidden="true">→</i>
          <article><span aria-hidden="true">♥</span><b>03 · GENERA IMPACTO</b><h3>Comparte lo aprendido</h3><p>Tu trabajo ayuda a que una solución y el conocimiento de la comunidad crezcan.</p></article>
        </div>
      </section>

      <section className="section projects" id="proyectos">
        <div className="section-heading">
          <div><span className="kicker">PROBLEMAS QUE PODEMOS RESOLVER JUNTOS</span><h2>Primero la misión.<br />Después la tecnología.</h2></div>
          <p>Cada proyecto explica a quién queremos ayudar, qué cambio buscamos y cómo puedes sumarte, aunque sea tu primera contribución.</p>
        </div>
        {hasProjectAccess ? <ProjectExplorer projects={projects} /> : <div className="project-access-gate"><span aria-hidden="true">HAIC</span><div><b>Los proyectos se abren cuando inicias sesión.</b><p>Crea una cuenta gratuita para conocer las misiones, clases y formas de colaborar.</p></div><a className="button primary" href="/registro?return_to=%2F">Iniciar sesión <span>→</span></a></div>}
      </section>

      {hasProjectAccess && <section className="section session" id="sesiones">
        <div className="session-media">
          <span className="live-label">SESIÓN 01 · 48 MIN</span>
          {latestSession ? <YoutubeLite url={latestSession.youtubeUrl} title={`Sesión destacada: ${latestSession.title}`} posterImage={latestSession.coverImageUrl} className="home-video-lite" /> : <><span className="session-play" aria-hidden="true">▶</span><div className="terminal-lines"><span>dataset.ready</span><span>model.training</span><span>community.learning</span></div></>}
        </div>
        <div className="session-copy">
          <span className="kicker">¿QUÉ PROBLEMA RESOLVEREMOS HOY?</span>
          <h2>{latestSession?.title || "De cero a un modelo que resuelve algo real."}</h2>
          <p>{latestSession?.excerpt || "Las sesiones no son demostraciones aisladas. Son el punto de entrada a un proyecto vivo: puedes reproducirlo, cuestionarlo y proponer la siguiente mejora."}</p>
          <ul><li><span>01</span>Conoce a quién puede ayudar</li><li><span>02</span>Construye la solución paso a paso</li><li><span>03</span>Elige una mejora para continuar</li></ul>
          <a href={latestSession ? `/blog/${latestSession.slug}` : "#como-funciona"}>Conocer el proyecto de esta clase <span>→</span></a>
        </div>
      </section>}

      <section className="section people-section" id="personas">
        <div className="section-heading"><div><span className="kicker">CONOCE A LA COMUNIDAD</span><h2>Personas detrás<br />de cada proyecto.</h2></div><p>HAIC comienza con un equipo pequeño y una invitación abierta: compartir lo que sabemos para que otras personas puedan avanzar.</p></div>
        <div className="home-team-grid">{teamMembers.map((member) => <article key={member.name}><div><ResponsiveImage src={member.imageUrl} alt={`Retrato de ${member.name}`} loading="lazy" sizes="160px" kind="team" /></div><span>{member.education}</span><h3>{member.name}</h3><strong>{member.role}</strong><p>{member.description}</p></article>)}</div>
        <a className="people-link" href="/nosotros">Conoce nuestra historia y propósito <span>→</span></a>
      </section>

      {hasProjectAccess && <section className="impact-strip" aria-label="Impacto verificable de HAIC">
        <div><strong>{projects.length}</strong><span>problemas convertidos en proyectos abiertos</span></div>
        <div><strong>{projects.filter((project) => project.youtubeUrl).length}</strong><span>clases disponibles para aprender a tu ritmo</span></div>
        <div><strong>{teamMembers.length}</strong><span>personas impulsando esta primera etapa</span></div>
        <div><strong>7</strong><span>formas distintas de participar</span></div>
      </section>}

      <section className="section welcome-section">
        <div className="section-heading"><div><span className="kicker">AQUÍ HAY UN LUGAR PARA TI</span><h2>No todos programan.<br />Todos pueden ayudar.</h2></div><p>Participa desde lo que ya sabes y aprende lo que sigue acompañado por la comunidad.</p></div>
        <div className="role-grid">{[["⌘","Programación"],["◐","Diseño"],["✎","Escritura"],["✓","Pruebas"],["≡","Documentación"],["▶","Contenido"],["＋","Estudiantes"],["◇","Docentes"]].map(([icon,label]) => <div key={label}><span>{icon}</span>{label}</div>)}</div>
      </section>

      <section className="first-contribution" id="primer-aporte">
        <div><span className="kicker">TU PRIMER APORTE</span><h2>Puedes comenzar<br />en menos de 15 minutos.</h2><p>No necesitas sentirte experto. Elige un paso pequeño y nosotros te ayudamos a encontrar el siguiente.</p><strong>No estarás solo.</strong></div>
        <ol><li><span>01</span><div><b>Crea tu cuenta</b><p>Guarda tu identidad de colaboración en HAIC.</p></div></li><li><span>02</span><div><b>Elige una misión</b><p>Encuentra un problema que te importe.</p></div></li><li><span>03</span><div><b>Busca una primera tarea</b><p>Empieza con una mejora clara y acotada.</p></div></li><li><span>04</span><div><b>Comparte tu aporte</b><p>Pide revisión y aprende con la retroalimentación.</p></div></li></ol>
        <div className="hero-actions"><a className="button primary" href="/registro">Crear mi cuenta <span>→</span></a><a className="button secondary" href="/participar">Ver cómo participar</a></div>
      </section>

      <section className="section values-section">
        <div className="section-heading"><div><span className="kicker">NUESTROS VALORES</span><h2>La forma en que<br />construimos importa.</h2></div><p>La tecnología es el medio. Las oportunidades, el aprendizaje y las soluciones compartidas son la meta.</p></div>
        <div className="values-grid">{[["♥","Compartimos conocimiento"],["↔","Ayudamos antes de competir"],["◎","Construimos para la comunidad"],["↗","Aprendemos haciendo"],["{ }","El código es abierto"],["¶","La documentación importa"]].map(([icon,label]) => <article key={label}><span>{icon}</span><h3>{label}</h3></article>)}</div>
      </section>

      <section className="community" id="comunidad">
        <div><span className="kicker">HIDALGO AI COMMUNITY</span><h2>Aquí hay un lugar<br />para ti.</h2></div>
        <div className="community-copy"><p>No vienes aquí solo a aprender inteligencia artificial. Vienes a construir soluciones que pueden cambiar la vida de alguien.</p><a className="button light" href="/registro">Quiero ser parte <span>→</span></a></div>
      </section>

      <footer><img src="/haic-logo.svg" alt="Hidalgo AI Community" /><p>Aprendemos construyendo soluciones para nuestra comunidad.</p><div><a href="#proyectos">Proyectos</a><a href="/participar">Participar</a><a href="/nosotros">Personas</a></div><small>© 2026 HAIC · Hecho en Hidalgo, México</small></footer>
    </main>
  );
}
