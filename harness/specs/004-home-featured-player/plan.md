# Plan de implementación — 004

## Resumen

Reutilizar `youtubeEmbedUrl` en el componente cliente de HOME, calcular la URL segura de la sesión destacada y sustituir el botón visual por un iframe únicamente cuando sea válida.

## Archivos

- `app/page.tsx`: selección y renderizado del reproductor.
- `app/globals.css`: encuadre responsive dentro de `.session-media`.

## Seguridad

El `src` sólo se genera después de validar host, protocolo e ID con el normalizador compartido. No se acepta HTML ni URL embed arbitraria desde D1.

## Pruebas

Lint, build y revisión local de iframe único, URL, título y tarjetas.

