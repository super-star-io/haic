# Plan de implementación — 003

## Resumen técnico

Centralizar la extracción segura del ID de YouTube en `lib/youtube.ts`, reutilizarla en POST/PATCH y en el detalle, e introducir un componente de reproductor semántico.

## Componentes afectados

| Área | Cambio |
|---|---|
| `lib/youtube.ts` | Validación y URL embed segura |
| API de entradas | Rechazo 400 para URL ausente/inválida |
| Administrador | Campo YouTube obligatorio y texto de ayuda |
| Detalle | Reproductor responsive con privacidad mejorada |
| D1 local | Completar videos faltantes |

## Seguridad y privacidad

Sólo se aceptan hosts explícitos de YouTube y IDs de 11 caracteres. El iframe usa `youtube-nocookie.com`, `loading=lazy`, `referrerPolicy=strict-origin-when-cross-origin` y no habilita cámara, micrófono ni geolocalización.

## Compatibilidad

Si un registro histórico inválido alcanza el detalle, se omite el iframe y permanece el contenido. No cambia el esquema.

## Pruebas

Lint, build, prueba directa del normalizador, consulta D1 y revisión visual del detalle y el formulario.

