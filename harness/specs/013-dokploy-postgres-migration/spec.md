# Especificación — 013 · Dokploy + PostgreSQL

## Objetivo

Preparar HAIC para ejecutarse en un VPS mediante Dokploy bajo `https://haic-hidalgo.org`, sustituyendo el runtime de Cloudflare/D1 por Node.js y PostgreSQL sin perder la posibilidad de exportar el contenido local existente.

## Criterios de aceptación

- La aplicación compila y arranca con Next.js sobre Node.js 22.
- Todos los accesos de datos usan `DATABASE_URL` y PostgreSQL.
- Better Auth usa el adaptador PostgreSQL y el dominio canónico.
- Existe una migración SQL reproducible para todas las tablas.
- Existe una imagen Docker no privilegiada con health check.
- Existe un Compose local para probar aplicación y PostgreSQL.
- Los datos D1 locales pueden exportarse a un formato de migración sin incluir sesiones.
- Las variables y pasos de Dokploy, Neubox, Google OAuth, backup y rollback quedan documentados.

## Fuera de alcance

- Cambiar DNS en Neubox.
- Acceder al VPS o a Dokploy.
- Introducir secretos reales en el repositorio.
- Ejecutar el despliegue público.
