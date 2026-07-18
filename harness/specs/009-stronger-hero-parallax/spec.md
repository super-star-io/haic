---
id: 009
title: Mayor recorrido del parallax del hero
status: verified
owner: HAIC
created: 2026-07-18
updated: 2026-07-18
---

# Objetivo

Hacer perceptible el desplazamiento vertical de la imagen del hero durante el scroll sin descubrir bordes ni producir un movimiento agresivo.

# Criterios de aceptación

- CA-01: El desplazamiento usa un recorrido de hasta 92 px según `--hero-scroll`.
- CA-02: La imagen tiene sobreescaneo vertical suficiente para cubrir el contenedor.
- CA-03: El parallax conserva respuesta al puntero y movimiento reducido.
- CA-04: El orden header → hero → article se mantiene.
- CA-05: Lint y build terminan correctamente.

# Resultado

Verificado localmente el 2026-07-18. Tras el scroll de prueba, la imagen alcanzó 58.1 px de traslación visible frente a los pocos píxeles del ajuste anterior.
