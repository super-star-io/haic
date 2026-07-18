---
id: 008
title: Hero antes del contenido del proyecto
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Reordenar el detalle para mostrar primero el hero full-width y colocar debajo categoría, título, descripción, video y contenido.

# Criterios de aceptación

- CA-01: El orden DOM es header → hero → article.
- CA-02: El título y la descripción aparecen debajo del hero.
- CA-03: El hero conserva ancho completo, altura compacta y parallax.
- CA-04: Video, contenido y enlaces permanecen dentro del artículo.
- CA-05: Lint y build terminan correctamente.

# Resultado

Verificado localmente el 2026-07-18. El orden de hijos directos es `header`, `hero`, `article`; el hero conserva 889 × 249 px en el viewport probado.
