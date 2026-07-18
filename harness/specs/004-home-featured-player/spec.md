---
id: 004
title: Reproductor de la sesión destacada en HOME
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Permitir reproducir desde HOME el video de la publicación destacada más reciente que tenga un enlace válido, sin salir del sitio.

# Requisitos

- RF-01: Sólo la sección de sesión destacada incorpora el reproductor.
- RF-02: El video proviene de la primera entrada de HOME con URL válida de YouTube.
- RF-03: Las tarjetas de proyectos conservan sus enlaces hacia el detalle.
- RF-04: Si no existe un video válido, se muestra el estado visual actual sin iframe.
- RNF-01: El iframe usa `youtube-nocookie.com`, título accesible, carga diferida y diseño adaptable.

# Criterios de aceptación

- CA-01: HOME muestra exactamente un iframe de la sesión destacada.
- CA-02: Su `src` utiliza `youtube-nocookie.com` y corresponde a la entrada seleccionada.
- CA-03: Las tres tarjetas siguen presentes y enlazan a sus detalles.
- CA-04: Lint y build terminan correctamente.

# Resultado

Verificado localmente el 2026-07-18. HOME contiene un único reproductor para la sesión destacada y conserva las tarjetas de proyecto. No se realizó despliegue.
