---
id: 005
title: Portadas administrables para proyectos
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Permitir que el editor seleccione una imagen de portada por entrada y utilizarla consistentemente en HOME, blog y hero del detalle.

# Requisitos funcionales

- RF-01: Cada entrada tiene `coverImageUrl` editable desde el administrador.
- RF-02: El editor puede seleccionar una imagen de la biblioteca HAIC o indicar una URL HTTPS.
- RF-03: La imagen aparece en la tarjeta de HOME, tarjeta del blog y hero del detalle.
- RF-04: Las publicaciones existentes reciben una portada original acorde a su tema.
- RF-05: POST y PATCH rechazan portadas vacías o inseguras.

# Requisitos no funcionales

- RNF-01: Sólo se aceptan rutas locales bajo `/projects/` o URLs HTTPS.
- RNF-02: Las imágenes usan texto alternativo, `object-fit: cover` y carga diferida en listados.
- RNF-03: Los assets locales se optimizan para evitar PNGs de varios megabytes.
- RNF-04: No se implementa carga a filesystem como almacenamiento persistente; una futura carga de archivos deberá usar R2 u otro object storage.

# Criterios de aceptación

- CA-01: D1 y Drizzle contienen `cover_image_url`.
- CA-02: El administrador presenta selector/campo de portada y vista previa.
- CA-03: HOME y blog muestran tres portadas reales.
- CA-04: El detalle muestra la portada correspondiente como hero.
- CA-05: Las tres entradas locales tienen rutas diferentes y válidas.
- CA-06: Lint y build terminan correctamente.

# Resultado

Verificado localmente el 2026-07-18. Las tres entradas tienen una portada distinta, seleccionable en administración y reutilizada en HOME, blog y detalle. No se realizó despliegue.
