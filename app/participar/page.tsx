import type { Metadata } from "next";
import UserMenu from "../UserMenu";

export const metadata: Metadata = {
  title: "Cómo participar · HAIC",
  description: "Requisitos técnicos y estructura para crear talleres y repositorios de código en Hidalgo AI Community.",
};

const repositoryTree = `├── data/                    # Persistencia local · ignorado en Git
├── models/                  # Modelos .joblib/.onnx · ignorado en Git
├── raw_data/
│   ├── fase_1/              # Histórico ~70% · público
│   └── fase_2/              # Live drop ~30% · privado
├── src/
│   ├── utils.py             # Fórmulas y helpers
│   ├── pipeline.py          # Ingesta ETL / ELT
│   ├── train.py             # Entrenamiento y evaluación
│   └── app.py               # API de inferencia FastAPI
├── pyproject.toml           # Dependencias con uv
├── README.md                # Guía pública
└── SHOW_AND_TELL_GUIDE.md   # Guion privado del expositor`;

const codeModules = [
  { number: "01", label: "UTILIDADES", file: "src/utils.py", title: "Haz visible el razonamiento", text: "Declara firmas y docstrings claros. Las fórmulas matemáticas deben quedar señaladas para que los participantes puedan implementarlas manualmente.", tags: ["Docstrings", "Fórmulas", "Helpers"] },
  { number: "02", label: "PIPELINE", file: "src/pipeline.py", title: "De datos crudos a ML Ready", text: "Usa DuckDB para persistencia y Pandas para transformar. Implementa capas Bronze, Silver y Gold, cargas incrementales sin duplicados y la auditoría processed_at.", tags: ["DuckDB", "Pandas", "ETL"] },
  { number: "03", label: "MODELO", file: "src/train.py", title: "Entrena de forma reproducible", text: "Filtra targets nulos, divide Train/Test de manera estratificada y atiende el desbalance. Serializa el resultado con joblib y compresión.", tags: ["Stratified", "Balanced", "Joblib"] },
  { number: "04", label: "INFERENCIA", file: "src/app.py", title: "Convierte el modelo en experiencia", text: "Sirve el modelo con FastAPI, cárgalo una sola vez mediante lifespan y ofrece inferencia batch y live drop con límites de respuesta.", tags: ["FastAPI", "Swagger", "Lifespan"] },
] as const;

export default function ParticipatePage() {
  return <main className="requirements-page">
    <header className="content-header requirements-header">
      <a href="/" aria-label="HAIC, inicio"><img src="/haic-logo.svg" alt="HAIC" /></a>
      <nav aria-label="Navegación principal"><a href="/">Inicio</a><a href="/blog">Proyectos</a><a className="active" href="/participar">Participar</a><a href="/nosotros">Nosotros</a><UserMenu /></nav>
    </header>

    <section className="requirements-hero">
      <div><span className="kicker">ESTÁNDAR ABIERTO HAIC · V1</span><h1>Construye un taller que<br/><em>otros puedan continuar.</em></h1><p>Antes de aportar código, prepara una experiencia reproducible: datos con intención, un modelo auditable y una demostración que invite a la comunidad a participar.</p><div className="requirements-actions"><a className="button primary" href="#checklist">Revisar requisitos →</a><a className="button secondary" href="#estructura">Ver estructura</a></div></div>
      <aside aria-label="Resumen de requisitos"><span>READY TO CONTRIBUTE</span><strong>04</strong><p>capas para convertir una idea en una práctica HAIC</p><div><i/> Reproducible</div><div><i/> Modular</div><div><i/> Lista para mostrar</div></aside>
    </section>

    <div className="requirements-layout">
      <aside className="requirements-index"><span>EN ESTA GUÍA</span><a href="#estructura"><b>01</b>Estructura</a><a href="#git"><b>02</b>Control de versiones</a><a href="#codigo"><b>03</b>Requisitos de código</a><a href="#show-and-tell"><b>04</b>Show & Tell</a><a href="#checklist"><b>05</b>Checklist final</a></aside>
      <div className="requirements-content">
        <section id="estructura" className="requirement-section"><div className="requirement-heading"><span>01 / REPOSITORIO</span><h2>Una estructura compartida reduce la fricción.</h2><p>Todos los talleres parten del mismo mapa. Así, los participantes encuentran rápidamente los datos, el pipeline, el modelo y la API.</p></div><div className="repo-window"><div className="repo-window-bar"><span/><span/><span/><b>haic-project-template</b></div><pre><code>{repositoryTree}</code></pre></div><div className="principle-row"><article><b>DATA</b><p>Separa datos históricos, datos en vivo y persistencia local.</p></article><article><b>MODEL</b><p>Mantén los artefactos entrenados fuera del repositorio público.</p></article><article><b>SOURCE</b><p>Divide responsabilidades en scripts pequeños y comprensibles.</p></article></div></section>

        <section id="git" className="requirement-section"><div className="requirement-heading"><span>02 / CONTROL DE VERSIONES</span><h2>La rama pública enseña; la solución privada respalda.</h2></div><div className="branch-map"><article><span>RAMA PÚBLICA</span><h3>main</h3><p>Plantillas, importaciones y comentarios estructurados. La lógica permanece por construir.</p><ul><li>✓ Código inicial guiado</li><li>✓ Fase 1 de los datos</li><li>✓ README público</li></ul></article><div className="branch-flow"><i/><b>git branch</b><i/></div><article className="complete"><span>REFERENCIA PRIVADA</span><h3>desarrollo-completo</h3><p>Solución programada y modelo entrenado para preparar y respaldar la demostración.</p><ul><li>✓ Implementación completa</li><li>✓ Modelo validado</li><li>✓ Guion del expositor</li></ul></article></div><div className="ignore-card"><div><span>.gitignore</span><strong>Lo que no debe publicarse</strong></div><code>data/<br/>models/<br/>raw_data/fase_2/<br/>SHOW_AND_TELL_GUIDE.md</code><p>La Fase 2 se libera durante el taller para producir el momento de descubrimiento y simular datos que llegan en vivo.</p></div></section>

        <section id="codigo" className="requirement-section"><div className="requirement-heading"><span>03 / CÓDIGO</span><h2>Cuatro módulos, una historia completa.</h2><p>Cada archivo cumple una responsabilidad y prepara el siguiente paso del flujo.</p></div><div className="module-grid">{codeModules.map(module=><article key={module.file}><div><span>{module.number}</span><b>{module.label}</b></div><code>{module.file}</code><h3>{module.title}</h3><p>{module.text}</p><footer>{module.tags.map(tag=><span key={tag}>{tag}</span>)}</footer></article>)}</div><div className="audit-callout"><span>REGLA DE AUDITORÍA</span><div><h3><code>processed_at</code> conecta el pipeline con el momento en vivo.</h3><p>La capa Gold debe registrar la hora actual para que la API consulte exactamente los datos procesados durante los últimos cinco minutos.</p></div></div></section>

        <section id="show-and-tell" className="requirement-section show-section"><div className="requirement-heading"><span>04 / SHOW & TELL</span><h2>No presentes diapositivas.<br/>Presenta un sistema que reacciona.</h2></div><div className="show-steps"><article><span>01</span><div><b>ESTADO INICIAL</b><h3>Levanta el entorno</h3><p>Inicia la API y el orquestador. Comprueba que la consulta está vacía antes de procesar nuevos datos.</p></div></article><article><span>02</span><div><b>LIVE DROP</b><h3>Libera la Fase 2</h3><p>Ejecuta la ingesta y observa el DAG interactivo mientras el pipeline transforma los datos.</p></div></article><article><span>03</span><div><b>INFERENCIA</b><h3>Haz visible la reacción</h3><p>Consulta Swagger y demuestra cómo el sistema encuentra, procesa y etiqueta los registros recientes.</p></div></article></div><p className="private-guide">El guion completo vive en <code>SHOW_AND_TELL_GUIDE.md</code> y permanece fuera de Git para no anticipar la experiencia.</p></section>

        <section id="checklist" className="requirements-checklist"><span className="kicker">ANTES DE PROPONER TU TALLER</span><h2>¿Está listo para la comunidad?</h2><div>{["La estructura estándar está completa","main contiene plantillas, no la solución","data, models y fase_2 están ignorados","El pipeline soporta carga inicial e incremental","Gold incluye processed_at","El entrenamiento atiende el desbalance","El modelo se guarda con joblib","FastAPI carga el modelo mediante lifespan","Los endpoints tienen límite de respuesta","Existe un guion privado de Show & Tell"].map((item,index)=><label key={item}><input type="checkbox"/><span>{String(index+1).padStart(2,"0")}</span>{item}</label>)}</div><a className="button primary" href="/blog">Explorar proyectos HAIC →</a></section>
      </div>
    </div>
    <footer><img src="/haic-logo.svg" alt="Hidalgo AI Community"/><p>IA abierta. Talento local. Impacto compartido.</p><div><a href="/blog">Proyectos</a><a href="/participar">Participar</a><a href="/nosotros">Nosotros</a></div><small>© 2026 HAIC · Hecho en Hidalgo, México</small></footer>
  </main>;
}
