---
id: 002
title: Proyectos dinámicos y seleccionables en HOME
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Problema

La HOME presenta tres proyectos codificados en React que no corresponden necesariamente con las entradas administradas en el blog.

# Objetivo

Usar entradas publicadas de D1 como fuente de los proyectos, métricas y sesión destacada de HOME. Cada entrada tendrá una bandera editable `showOnHome`.

# Requisitos funcionales

- RF-01: El editor puede activar o desactivar “Mostrar en HOME” al crear o editar una entrada.
- RF-02: Sólo las entradas publicadas y con la bandera activa aparecen en HOME.
- RF-03: Categorías, conteos, enlaces y sesión destacada se derivan de esas entradas.
- RF-04: Deben existir datos iniciales locales suficientes para sustituir las tres tarjetas estáticas.
- RF-05: Borradores y entradas archivadas nunca aparecen aunque conserven la bandera.

# Requisitos no funcionales

- RNF-01: La HOME debe mostrar estados de carga y vacío sin fallar.
- RNF-02: El endpoint público sólo expone campos editoriales de publicaciones visibles.
- RNF-03: La migración agrega una columna con valor predeterminado seguro `false`.

# Criterios de aceptación

- CA-01: La tabla `posts` contiene `show_on_home` y las APIs de creación/edición la persisten.
- CA-02: El administrador permite editar la bandera.
- CA-03: `/api/home` devuelve exclusivamente publicaciones destacadas.
- CA-04: La HOME no contiene el arreglo estático `projects` y renderiza datos del endpoint.
- CA-05: Tres entradas locales reales están publicadas y destacadas.

# Resultado

Verificado localmente el 2026-07-18. La HOME muestra tres publicaciones provenientes de D1 y el administrador permite editar la bandera. No se realizó ningún despliegue.
