# Publicación de HAIC en Dokploy

Dominio canónico: `https://haic-hidalgo.org`

## Desarrollo local

El desarrollo y producción utilizan el mismo motor PostgreSQL para evitar diferencias de dialecto. El archivo local `.env.local` está ignorado por Git y ya está alineado con el Compose.

```bash
# 1. Levantar PostgreSQL local y aplicar migraciones
npm run dev:setup

# 2. Validar variables locales
npm run config:check

# 3. Iniciar Next.js en localhost
npm run dev
```

PostgreSQL solo se publica en `127.0.0.1:5432`, no en todas las interfaces. Para detener la infraestructura:

```bash
docker compose down
```

`dev:setup` espera a que PostgreSQL reporte estado saludable antes de ejecutar migraciones. Esto evita errores de arranque en instalaciones nuevas.

Para borrar deliberadamente todos los datos locales se requiere eliminar además el volumen `haic_postgres_data`; esa operación no forma parte del flujo cotidiano.

## Arquitectura

- Aplicación: Dockerfile del repositorio, Node.js 22, Next.js standalone, puerto interno `3000`.
- Base de datos: PostgreSQL 16 creada como Database en Dokploy.
- Proxy y TLS: Traefik/Let's Encrypt administrado por Dokploy.
- Datos persistentes: volumen de PostgreSQL; las imágenes editoriales actuales viajan dentro de la imagen.
- Backups: PostgreSQL hacia un destino S3 externo al VPS.

El `docker-compose.yml` del repositorio sirve para una prueba integral local. En producción conviene crear PostgreSQL desde la sección Databases de Dokploy y desplegar la web como Application.

## 1. DNS en Neubox

En la zona DNS de `haic-hidalgo.org`:

| Tipo | Host | Valor | TTL |
| --- | --- | --- | --- |
| A | `@` | IP pública IPv4 del VPS | 300–3600 |
| CNAME | `www` | `haic-hidalgo.org` | 300–3600 |

- Eliminar registros A/AAAA/CNAME anteriores que entren en conflicto para `@` o `www`.
- Agregar AAAA solo si el VPS tiene IPv6 configurado y accesible.
- No crear todavía el dominio en Dokploy hasta que `haic-hidalgo.org` resuelva a la IP del VPS.
- Abrir en el firewall únicamente SSH, TCP 80 y TCP 443. PostgreSQL y el puerto 3000 no deben ser públicos.

## 2. PostgreSQL en Dokploy

1. Crear Project: `HAIC Production`.
2. Add Service → Database → PostgreSQL.
3. Nombre sugerido: `haic-postgres`; imagen: PostgreSQL 16.
4. Database: `haic`; user: `haic_app`; contraseña aleatoria larga.
5. Desplegar y copiar la URL interna. No habilitar exposición pública.
6. Configurar límites iniciales razonables: 512 MB de RAM y 0.5 CPU; ajustar según métricas.
7. En Settings → Destinations registrar un bucket S3 y crear un backup diario. Ejecutar `Test` y comprobar el objeto en el bucket.

La URL interna tendrá una forma similar a:

```text
postgresql://haic_app:SECRET@INTERNAL_POSTGRES_HOST:5432/haic
```

## 3. Aplicación en Dokploy

1. Add Service → Application.
2. Seleccionar el proveedor Git y la rama protegida de producción.
3. Build Type: Dockerfile; Dockerfile path: `./Dockerfile`; context: `.`.
4. Container port/domain port: `3000`. No agregar un host port público.
5. Una réplica en el primer despliegue.
6. Health check: `/api/health`, puerto `3000`, intervalo 30 s.
7. El contenedor aplica las migraciones PostgreSQL antes de iniciar el servidor.

## 4. Variables de producción

Copiar `.env.production.example` al editor de Environment de la aplicación y sustituir únicamente los valores secretos:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://haic_app:SECRET@INTERNAL_POSTGRES_HOST:5432/haic
BETTER_AUTH_URL=https://haic-hidalgo.org
BETTER_AUTH_SECRET=GENERATED_SECRET
NEXT_PUBLIC_SITE_URL=https://haic-hidalgo.org
GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET
HAIC_BOOTSTRAP_SUPERUSER_EMAIL=fernando.robles@outlook.com
```

Generar `BETTER_AUTH_SECRET` fuera del repositorio:

```bash
openssl rand -base64 48
```

`NEXT_PUBLIC_SITE_URL` se fija durante el build; el Dockerfile ya usa `https://haic-hidalgo.org` como valor predeterminado. Los demás secretos son exclusivamente de runtime.

Antes de desplegar, las variables pueden comprobarse en una terminal segura con:

```bash
npm run config:check:production
```

La validación rechaza PostgreSQL ausente, placeholders, HTTP en producción, diferencias entre el origen público y Better Auth, secretos menores de 32 caracteres, puertos inválidos y una sola credencial de Google sin su pareja.

## 5. Dominio y TLS

1. En Domains de la Application agregar `haic-hidalgo.org` al puerto `3000`.
2. Activar HTTPS con Let's Encrypt y redirección HTTP → HTTPS.
3. Agregar también `www.haic-hidalgo.org` si se desea y redirigirlo al dominio canónico.
4. Verificar que `/api/health` responda `200` y `database: connected`.

## 6. Google OAuth

En Google Cloud Console, cliente OAuth tipo Web Application:

```text
Authorized JavaScript origin:
https://haic-hidalgo.org

Authorized redirect URI:
https://haic-hidalgo.org/api/auth/callback/google
```

Conservar los valores localhost si también se seguirá desarrollando localmente. El Client Secret se pega solo en Dokploy.

## 7. Migrar el contenido local

La exportación ya puede generarse desde D1 local sin sesiones ni tokens OAuth:

```bash
npm run db:export:d1
```

Resultado ignorado por Git: `outputs/haic-d1-export.json`. Contiene el hash de contraseña y debe tratarse como secreto.

Para importar desde una terminal segura con acceso a PostgreSQL:

```bash
DATABASE_URL='postgresql://...' npm run db:import:postgres -- outputs/haic-d1-export.json
```

El import preserva IDs, usuario, cuenta de credenciales, publicaciones, roles y auditoría; excluye sesiones y tokens OAuth. Después, iniciar sesión nuevamente.

Para promover explícitamente al fundador una vez registrado:

```bash
DATABASE_URL='postgresql://...' npm run admin:promote -- fernando.robles@outlook.com
```

Tras confirmar el rol, retirar `HAIC_BOOTSTRAP_SUPERUSER_EMAIL` de Dokploy.

## 8. Verificación posterior

- `/api/health` responde 200.
- HOME, `/blog`, `/participar` y `/nosotros` cargan.
- Registro por correo crea `users` y `accounts`.
- Google OAuth vuelve al dominio, no a localhost.
- La sesión persiste entre HOME, blog, perfil y admin.
- Logout invalida la sesión.
- El usuario común no entra a `/admin`.
- El superadministrador puede editar entradas y accesos.
- Las tres publicaciones muestran sus pósters y video.
- Reiniciar la Application conserva todos los datos.
- El backup diario aparece en S3 y se realiza al menos una prueba de restauración.

## 9. Rollback

1. No ejecutar cambios destructivos de esquema sin un backup probado.
2. Mantener la imagen anterior disponible en Dokploy.
3. Si el health check falla, volver a la versión anterior de la Application.
4. Las migraciones y los datos no se revierten al cambiar la imagen: restaurar PostgreSQL desde el backup cuando una migración haya alterado datos de forma incompatible.
