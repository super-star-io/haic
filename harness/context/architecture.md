# Arquitectura vigente

Este documento describe el estado conocido de la plataforma. Debe actualizarse cuando una especificación verificada cambie la arquitectura.

## Aplicación

- Aplicación Next.js desplegada como runtime Node.js.
- Persistencia en PostgreSQL.
- Acceso a datos mediante Drizzle ORM.
- Autenticación con Better Auth.
- Inicio local por correo y contraseña; Google OAuth es opcional cuando existen credenciales.

## Rutas principales

- `/`: portada pública y hero de HAIC.
- `/blog`: catálogo de entradas para usuarios con sesión activa.
- `/blog/[slug]`: detalle sujeto al nivel de acceso de la entrada.
- `/registro`: alta e inicio de sesión.
- `/perfil`: cuenta del usuario autenticado.
- `/admin`: gestión editorial y de usuarios según rol.
- `/salir`: cierre de sesión.
- `/api/auth/[...all]`: endpoints de Better Auth.
- `/api/me`: sesión y perfil actual.
- `/api/admin/posts`: administración de entradas.
- `/api/admin/users`: administración de usuarios y permisos.

## Datos

Tablas principales:

- `users`: identidad, rol, nivel de acceso, estado y perfil.
- `sessions`: sesiones persistentes.
- `accounts`: credenciales/proveedores asociados.
- `verifications`: tokens de verificación administrados por autenticación.
- `posts`: contenido y nivel mínimo requerido.
- `audit_logs`: trazabilidad de operaciones sensibles.

Roles conocidos: `standard`, `admin`, `superadmin`.

## Límites de confianza

- El navegador nunca decide por sí solo si una operación está permitida.
- Los handlers y consultas del servidor aplican autenticación, rol, estado y nivel de acceso.
- PostgreSQL es la fuente de verdad de usuarios, sesiones, permisos y contenido.
- Las variables de entorno contienen secretos; el repositorio sólo documenta sus nombres.

## Identidad visual

- Azul marino: `#0b1626`.
- Ámbar: `#ffb000`.
- Fondo claro: `#f7f5f0`.
- Estética editorial tecnológica, limpia y de interacción evidente.
