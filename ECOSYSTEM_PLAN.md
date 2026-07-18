# Plan maestro del ecosistema HAIC

## 1. Propósito

Convertir retos reales de Hidalgo en conocimiento abierto y reutilizable. Cada proyecto debe producir tres piezas conectadas: una sesión en YouTube, un artículo técnico en el portal y un repositorio abierto.

## 2. Arquitectura del ecosistema

| Canal | Función | Entregable mínimo |
|---|---|---|
| YouTube | Descubrimiento y clase guiada | Sesión completa, capítulos, enlaces y llamada a contribuir |
| Portal HAIC | Contexto, aprendizaje y navegación | Ficha del proyecto, artículo, resultados, ruta y autores |
| GitHub organización | Código y colaboración | Repositorio reproducible, issues, licencia y guía de contribución |
| Comunidad | Conversación y continuidad | Calendario, convocatoria de retos, seguimiento y reconocimientos |

## 3. Unidad editorial: un proyecto

Cada proyecto pasa por este flujo:

1. **Reto:** problema local, beneficiario, alcance y criterio de éxito.
2. **Datos:** fuente, permisos, privacidad, calidad y diccionario.
3. **Experimento:** baseline, modelo, métricas y decisiones.
4. **Producto mínimo:** demo o API reproducible.
5. **Sesión:** explicación grabada con capítulos.
6. **Publicación:** artículo que une problema, método, resultados y límites.
7. **Colaboración:** backlog público con issues pequeños y responsables.
8. **Seguimiento:** mejoras, impacto y lecciones posteriores.

## 4. Estructura recomendada en GitHub

- `haic-community/haic-web`: portal y blog.
- `haic-community/project-template`: plantilla oficial para nuevos casos.
- `haic-community/proyecto-<slug>`: un repositorio por proyecto real.
- `.github`: código de conducta, perfiles, plantillas de issues y pull requests.

Todo repositorio de proyecto debe incluir `README`, `LICENSE`, `CONTRIBUTING`, `CODE_OF_CONDUCT`, `DATA_CARD`, `MODEL_CARD`, entorno reproducible, datos de ejemplo permitidos, pruebas mínimas y un tablero de issues.

## 5. Roles mínimos

- **Curaduría:** selecciona retos y valida que exista valor comunitario.
- **Líder técnico:** define arquitectura, reproducibilidad y calidad.
- **Líder editorial:** transforma el trabajo en sesión y artículo entendible.
- **Enlace local:** representa al beneficiario y valida el contexto.
- **Maintainer:** revisa issues, pull requests y continuidad.

Una persona puede cubrir más de un rol al inicio, pero cada rol debe tener dueño explícito por proyecto.

## 6. Cadencia sugerida por ciclo de 4 semanas

- **Semana 1:** anunciar reto, contexto y repositorio; preparar datos y baseline.
- **Semana 2:** sesión práctica 1; publicar notas y primeros issues.
- **Semana 3:** sesión práctica 2 o clínica de contribuciones; integrar mejoras.
- **Semana 4:** publicar artículo final, demo, resultados y retrospectiva.

## 7. MVP en 90 días

### Días 1–30 · Fundamentos

- Definir nombre, manifiesto, audiencia y código de conducta.
- Crear organización, plantillas y taxonomía editorial.
- Lanzar portal con tres proyectos semilla, aunque dos estén “próximamente”.
- Preparar identidad del canal y formato de grabación.

### Días 31–60 · Primer ciclo público

- Ejecutar y grabar el primer proyecto completo.
- Publicar video, artículo y repositorio el mismo día.
- Abrir 5–10 issues bien delimitados y realizar una clínica comunitaria.
- Medir dónde abandonan o preguntan los usuarios.

### Días 61–90 · Repetibilidad

- Lanzar el segundo proyecto usando las plantillas.
- Incorporar al menos dos maintainers adicionales.
- Automatizar revisión, pruebas, despliegue y ficha del portal.
- Publicar calendario trimestral y convocatoria de retos.

## 8. Flujo de publicación

Usar un archivo de contenido por proyecto en el portal. Una pull request agrega o actualiza la ficha, pasa validaciones automáticas y publica al aprobarse. La ficha debe enlazar video, artículo, repositorio, demo e issues recomendados; nunca duplicar el código en el blog.

## 9. Métricas que sí importan

- Personas que reproducen un proyecto de principio a fin.
- Contribuyentes únicos y porcentaje de primeros contribuidores.
- Issues cerrados por la comunidad y tiempo de primera respuesta.
- Organizaciones locales que proponen o validan retos.
- Proyectos que llegan a demo, adopción o decisión informada.
- Retención entre una sesión y la siguiente.

Evitar usar vistas y estrellas como únicas métricas; sirven para alcance, no prueban aprendizaje ni impacto.

## 10. Decisiones pendientes antes del lanzamiento

- Dominio y nombre definitivo del canal de YouTube.
- Propietarios de la organización de GitHub y política de acceso.
- Licencias por defecto para código, contenido y datos.
- Proceso de consentimiento, privacidad y anonimización.
- Primer reto, organización beneficiaria y criterio verificable de éxito.
