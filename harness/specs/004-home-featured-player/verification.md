# Verificación — 004

## Evidencia

| Criterio | Resultado | Evidencia |
|---|---|---|
| CA-01 | passed | HOME contiene exactamente 1 `.home-video-player` |
| CA-02 | passed | `https://www.youtube-nocookie.com/embed/aircAruvnKk`; título accesible y carga diferida |
| CA-03 | passed | Tres tarjetas visibles con enlaces a sus slugs correspondientes |
| CA-04 | passed | ESLint, build vinext y validador del harness terminaron correctamente |

## Revisión visual

El iframe fue visible y ocupó 763 × 458 px dentro de un contenedor de 765 × 460 px. La prueba se realizó en la HOME local con los datos obtenidos desde `/api/home`.

## Resultado

`passed`
