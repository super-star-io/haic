# Configuración local de acceso con Google

## 1. Crear las credenciales

En Google Cloud Console crea un cliente OAuth 2.0 de tipo **Aplicación web**.

- Origen autorizado: `http://localhost:3000`
- URI de redirección autorizada: `http://localhost:3000/api/auth/callback/google`

## 2. Crear `.env.local`

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=genera-un-secreto-largo-y-aleatorio
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret
HAIC_BOOTSTRAP_SUPERUSER_EMAIL=correo-del-fundador@gmail.com
```

No confirmes `.env.local` en Git ni compartas el secreto en el chat.

## 3. Actualizar la base local

Detén y vuelve a iniciar el servidor después de crear las variables. Antes de probar el registro, ejecuta una vez `npm run db:local:migrate` para crear las tablas en la base D1 local.

## Flujo resultante

1. `/registro` muestra **Continuar con Google**.
2. Google devuelve una identidad verificada.
3. Better Auth crea el registro base directamente en `users` y enlaza la cuenta en `accounts`.
4. HAIC completa organización, biografía, rol y nivel desde el mismo registro.
5. Las visitas posteriores se validan mediante la sesión almacenada en `sessions`.
