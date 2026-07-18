---
id: 007
title: Parallax de profundidad y lente en hero de proyecto
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Dar profundidad al hero full-width mediante una combinación sutil de desplazamiento por scroll, inclinación por puntero y una lente luminosa geométrica, evitando el parallax vertical genérico.

# Requisitos

- RF-01: La imagen responde al scroll con traslación y escala limitadas.
- RF-02: En dispositivos con puntero, la imagen y la lente responden suavemente a la posición dentro del hero.
- RF-03: El efecto no bloquea enlaces, scroll ni contenido.
- RNF-01: Actualizaciones agrupadas con `requestAnimationFrame`.
- RNF-02: `prefers-reduced-motion: reduce` elimina transformaciones y transiciones.
- RNF-03: El hero conserva texto alternativo y comportamiento full-width.

# Criterios de aceptación

- CA-01: El hero expone variables de scroll y puntero y transforma capas separadas.
- CA-02: Existe una lente visual sin capturar eventos.
- CA-03: La preferencia de movimiento reducido desactiva el efecto.
- CA-04: Lint y build pasan; el hero conserva 100vw y altura compacta.

# Resultado

Verificado localmente el 2026-07-18. El hero mantiene 100vw × 249 px en el viewport probado y responde tanto al scroll como al puntero.
