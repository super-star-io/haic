# Verificación — 005

## Evidencia

| Criterio | Resultado | Evidencia |
|---|---|---|
| CA-01 | passed | Migración `0003_curvy_princess_powerful.sql` aplicada localmente |
| CA-02 | passed | Campo con biblioteca, URL personalizada y vista previa visible en `/admin` |
| CA-03 | passed | Tres imágenes con alt visible en HOME y tres en `/blog` |
| CA-04 | passed | Hero de 845 × 423 px verificado en el detalle de visión artificial |
| CA-05 | passed | Consulta D1: 3 rutas distintas, 0 publicaciones sin portada |
| CA-06 | passed | ESLint, build vinext y harness finalizaron correctamente |

## Seguridad y rendimiento

- Ruta `/projects/test.jpg`: aceptada.
- URL HTTPS con extensión WebP: aceptada.
- `javascript:` y `/uploads/`: rechazadas.
- Portadas finales JPEG: 415 KB, 469 KB y 473 KB.
- Los PNGs de trabajo fueron eliminados de `public/projects/`; los originales generados siguen disponibles fuera del repositorio.

## Revisión visual

- HOME: tres portadas, texto alternativo y recorte consistente.
- Blog: tres tarjetas con portada.
- Detalle: hero dinámico y reproductor conservado.
- Administrador: selector con `datalist`, ruta actual y vista previa.

## Resultado

`passed`
