# Verificación — 012

## Línea base

- Assets editoriales: 3.2 MB.
- Build: 7.5 MB.
- CSS fuente: 49,857 B.
- CSS producción: 41,767 B; gzip estimado 9,608 B.
- Página Nosotros: 11 fuentes y 76 assets observados en desarrollo.
- Imágenes estáticas: `Cache-Control: no-cache` local.

## Resultado

`complete`

- Assets públicos: 788 KB (antes 3.2 MB; reducción aproximada de 75%).
- Medios responsivos de proyectos y equipo: 600 KB en AVIF.
- Build: 4.5 MB (antes 7.5 MB; reducción aproximada de 40%).
- CSS fuente: 36,028 B (antes 49,857 B; reducción aproximada de 28%).
- CSS fuente comprimido: 8,398 B.
- Fuentes web incluidas en build: 0 (antes 11 archivos).
- HOME: consulta D1 en servidor; solo el explorador de filtros, sesión y menú hidratan como islas cliente.
- YouTube: sin `iframe` en el HTML inicial; se crea al pulsar el reproductor.
- Caché: reglas largas e inmutables para imágenes versionadas en `public/_headers` (en desarrollo vinext conserva `no-cache`).
- Rutas verificadas con HTTP 200: `/`, `/blog`, `/nosotros`, `/registro`.
- `npm run lint`: correcto.
- `npm test`: 4/4 pruebas correctas, incluyendo build de producción.
