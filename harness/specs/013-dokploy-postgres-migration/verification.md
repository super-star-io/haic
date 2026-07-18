# Verificación — 013

## Resultado local

- Esquema PostgreSQL generado: 6 tablas, claves foráneas e índices.
- Next.js Node standalone: build correcto.
- Lint: correcto.
- Pruebas: 5/5.
- Configuración local válida: PostgreSQL en localhost, HTTP permitido y Google opcional.
- Configuración productiva válida: PostgreSQL, HTTPS, origen único, secreto fuerte y credenciales Google pareadas.
- Configuración productiva inválida rechazada con exit code 1.
- Exportación D1: 1 usuario y 3 publicaciones; sesiones y tokens OAuth excluidos.
- Dominio canónico: `https://haic-hidalgo.org`.
- Dockerfile: multi-stage, usuario no privilegiado, migración previa al arranque y health check.
- Compose: PostgreSQL 16, volumen nombrado, migración y aplicación.
- Auditoría de dependencias: 0 vulnerabilidades altas o críticas; 6 moderadas reportadas en herramientas transitivas. No se aplicó `npm audit fix --force` porque propone downgrades incompatibles.

## Validación Docker local

- Docker Desktop 29.6.1 y Compose 5.3.0 detectados.
- PostgreSQL 16 Alpine levantado con volumen persistente y health check correcto.
- Las 6 tablas se migraron correctamente.
- Se importaron 1 usuario superadmin y 3 publicaciones desde D1.
- `dev:setup` ahora espera el health check antes de migrar.
- Imagen productiva construida correctamente para la arquitectura local.
- Contenedor ejecutado como usuario `nextjs`, sin privilegios.
- Health check del contenedor: `healthy`, base `connected`, 0 reinicios.
- Rutas `/`, `/blog`, `/participar`, `/nosotros`, `/registro`, `/api/home` y `/api/auth/get-session`: HTTP 200.
- Registro y lectura de sesión dentro del contenedor: correctos; usuario temporal eliminado.
- Imagen local: aproximadamente 180 MB.
- Lint correcto; build correcto; pruebas 6/6.

## Pendiente externo

- Configurar DNS Neubox, PostgreSQL Dokploy, secrets, Google OAuth y backup S3.
