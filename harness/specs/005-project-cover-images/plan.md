# Plan de implementación — 005

## Resumen

Agregar una columna de portada, validar su contrato en servidor, ampliar el endpoint público y reutilizar el mismo dato editorial en las tres superficies visuales.

## Datos

`posts.cover_image_url TEXT NOT NULL DEFAULT ''`. La migración es aditiva. Después de aplicarla, se asignan rutas locales a las publicaciones actuales.

## Selección de imagen

El administrador ofrece un `input` con `datalist` de la biblioteca incluida y permite pegar una URL HTTPS. Esto es compatible con Cloudflare. La carga binaria directa queda fuera de alcance hasta disponer de R2.

## Seguridad

El servidor acepta exclusivamente `/projects/<archivo-imagen>` o `https://...` con extensión de imagen conocida. Rechaza esquemas ejecutables, rutas relativas arbitrarias y valores vacíos.

## Verificación

Migración local, normalizador, consulta D1, lint, build y revisión visual de HOME, blog, detalle y administrador.

