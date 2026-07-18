# Verificación — 003

## Evidencia

| Criterio | Resultado | Evidencia |
|---|---|---|
| CA-01 | passed | Consulta D1: 3 publicaciones, 0 sin video |
| CA-02 | passed | Detalle local contiene un iframe `youtube-nocookie.com/embed/aircAruvnKk`, `loading=lazy` y título accesible |
| CA-03 | passed | Revisión del editor: `input[name=youtubeUrl]` tiene `required=true` y texto explicativo |
| CA-04 | passed | POST/PATCH validan con `youtubeVideoId` y responden 400 antes de escribir; host externo rechazado en prueba del normalizador |
| CA-05 | passed | ESLint y build vinext finalizaron con código 0 |

## Verificaciones ejecutadas

```text
node --experimental-strip-types --input-type=module -e "...youtubeVideoId..."
npm run lint
npm run build
node harness/scripts/validate.mjs
```

- URL `youtu.be` válida: aceptada y normalizada.
- Host `example.com`: rechazado.
- Harness: válido.
- Revisión visual: reproductor presente en el detalle y campo obligatorio en `/admin`.
- Persistencia: sólo D1 local; ninguna escritura remota.

## Resultado

`passed`
