---
id: 006
title: Hero compacto de ancho completo
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Reducir la altura de la portada del detalle y extenderla de borde a borde del viewport sin deformar la imagen ni ensanchar el contenido editorial.

# Criterios de aceptación

- CA-01: El hero mide `100vw`.
- CA-02: Su altura adaptable permanece entre 210 y 360 px.
- CA-03: La imagen conserva `object-fit: cover`.
- CA-04: Título, video y cuerpo conservan el ancho de lectura existente.
- CA-05: Lint y build terminan correctamente.

# Resultado

Verificado localmente el 2026-07-18. En un viewport de 889 px el hero midió 889 × 249 px, de borde a borde, mientras el artículo conservó 820 px de ancho.
