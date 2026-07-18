# Verificación — 007

## Evidencia

- Hero: 889 × 249 px en viewport de 889 px; posición izquierda 0.
- Scroll después de 320 px: `--hero-scroll=0.193`, reflejado en la matriz de transformación.
- Puntero: `--hero-x=0.575`, `--hero-y=-0.363`.
- Lente: una capa presente y `pointer-events:none`.
- Movimiento reducido: media query y salida temprana del componente.
- ESLint y build vinext: correctos.

## Resultado

`passed`
