---
id: 010
title: Sección Nosotros y equipo HAIC
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Presentar a los desarrolladores de HAIC mediante una sección “Nosotros” clara, humana y escalable, inicialmente con Fernando Robles Rivera y Manuel Antonio Camacho Reyes.

# Requisitos funcionales

- RF-01: La navegación principal incluye un enlace a `#nosotros`.
- RF-02: La sección muestra fotografía, nombre, formación y descripción de cada integrante.
- RF-03: La estructura se genera desde una colección de datos y permite agregar integrantes sin cambiar el layout.
- RF-04: Las dos fotografías proporcionadas se almacenan como assets locales sin modificar los originales.

# Requisitos no funcionales

- RNF-01: Cuadrícula responsive con `auto-fit` y tamaño mínimo por tarjeta.
- RNF-02: Fotografías con texto alternativo, carga diferida y recorte consistente.
- RNF-03: Diseño coherente con la paleta y tipografía HAIC.

# Criterios de aceptación

- CA-01: Se renderizan exactamente dos tarjetas con nombres y fotografías correctos.
- CA-02: La sección es accesible desde la navegación.
- CA-03: En viewport estrecho las tarjetas se apilan; en amplio pueden crecer a varias columnas.
- CA-04: Lint y build terminan correctamente.

# Resultado

Verificado localmente el 2026-07-18. La sección muestra dos integrantes en dos columnas a 889 px y se apila correctamente a 390 px.
