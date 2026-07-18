---
id: 012
title: Optimización integral de peso y carga
status: approved
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Reducir transferencia, solicitudes, hidratación y trabajo de renderizado sin alterar funcionalidad, diseño, autenticación ni contenido.

# Alcance

- Consolidar CSS duplicado.
- Generar imágenes AVIF responsive y un Open Graph ligero.
- Eliminar fuentes web no utilizadas.
- Renderizar datos iniciales de HOME en servidor y aislar el filtro.
- Evitar iframes de YouTube hasta interacción explícita.
- Hacer metadata estable y documentar caché de assets.
- Mantener fallbacks JPEG y accesibilidad.

# Criterios de aceptación

- CA-01: Imágenes editoriales totales se reducen al menos 60%.
- CA-02: CSS fuente y bundle disminuyen sin pérdida visual.
- CA-03: No se precargan 11 fuentes.
- CA-04: HOME recibe proyectos en HTML y no solicita `/api/home` para su primera pintura.
- CA-05: YouTube no crea iframe hasta pulsar reproducir.
- CA-06: HOME, blog, detalle, nosotros, registro y admin siguen funcionando.
- CA-07: Lint, build y harness pasan.

