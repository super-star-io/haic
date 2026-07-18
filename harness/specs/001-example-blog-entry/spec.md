---
id: 001
title: Entrada de ejemplo de deep learning
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Problema

El administrador necesita una entrada de referencia y documentación concreta del contrato para crear publicaciones mediante la API.

# Objetivo

Crear una entrada local publicada, asociada al superadministrador, con recursos públicos de GitHub y YouTube, y documentar el `POST /api/admin/posts`.

# No objetivos

- Desplegar o modificar una base remota.
- Automatizar la obtención de cookies de sesión.
- Presentar el proyecto externo como propiedad de HAIC.

# Requisitos funcionales

- RF-01: La entrada debe aparecer en el blog y el administrador local.
- RF-02: Debe enlazar a un repositorio público de deep learning.
- RF-03: Debe enlazar a un video público introductorio.
- RF-04: `doc.md` debe explicar autenticación, cuerpo, respuesta y errores del POST.

# Reglas de acceso y datos

La entrada se publica con nivel requerido 1. Su autor es `fernando.robles@outlook.com`. Los recursos externos se identifican como referencias educativas.

# Criterios de aceptación

- CA-01: Existe exactamente una entrada con slug `clasificador-imagenes-tensorflow` en D1 local.
- CA-02: La entrada está publicada, requiere nivel 1 y contiene las dos URLs públicas.
- CA-03: `doc.md` contiene un ejemplo válido y no incluye credenciales ni cookies reales.
- CA-04: La creación queda registrada en `audit_logs`.

# Resultado

Verificado localmente el 2026-07-18. No se realizó publicación ni escritura remota.
