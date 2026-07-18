---
id: 003
title: Reproductor de clase en el detalle de cada entrada
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Problema

El detalle sólo ofrece un enlace externo a YouTube. El usuario abandona HAIC para ver la clase y algunas publicaciones carecen de video.

# Objetivo

Hacer obligatorio un video válido al guardar una entrada y reproducirlo dentro de su detalle mediante el modo de privacidad mejorada de YouTube.

# Requisitos funcionales

- RF-01: POST y PATCH rechazan una entrada sin URL válida de YouTube.
- RF-02: Se aceptan URLs `youtube.com/watch`, `youtu.be`, `youtube.com/embed` y `youtube-nocookie.com/embed`.
- RF-03: El detalle muestra un reproductor adaptable antes del contenido técnico.
- RF-04: Se conserva un enlace para abrir el video directamente como alternativa.
- RF-05: Las publicaciones locales existentes deben tener video.

# Requisitos no funcionales

- RNF-01: El iframe usa `youtube-nocookie.com`, carga diferida, título accesible y permisos mínimos.
- RNF-02: Una URL inválida nunca se concatena directamente en `src`.
- RNF-03: La ausencia histórica de video se maneja sin romper el detalle.

# Criterios de aceptación

- CA-01: Las tres publicaciones locales tienen una URL de YouTube válida.
- CA-02: El detalle contiene un iframe con URL normalizada de `youtube-nocookie.com`.
- CA-03: El administrador marca YouTube como campo obligatorio.
- CA-04: Las APIs devuelven 400 para video ausente o inválido.
- CA-05: Lint y build terminan correctamente.

# Resultado

Verificado localmente el 2026-07-18. Las tres publicaciones tienen video y el detalle reproduce la clase mediante el dominio de privacidad mejorada. No se realizó despliegue.
