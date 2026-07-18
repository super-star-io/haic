# ADR-0001: Better Auth sobre D1 y Drizzle

- Estado: accepted
- Fecha: 2026-07-18
- Relacionado con: SPEC-000

## Contexto

HAIC necesita registro local, sesiones persistentes, proveedores sociales opcionales y usuarios almacenados en su propia base para aplicar roles y niveles de acceso.

## Decisión

Usar Better Auth para identidad y sesión, con su adaptador Drizzle sobre Cloudflare D1. Mantener en la tabla de usuarios los atributos de autorización propios de HAIC. Permitir correo/contraseña local y Google OAuth únicamente cuando sus credenciales estén configuradas.

## Consecuencias

- La identidad y las sesiones comparten la persistencia de la plataforma.
- El esquema requerido por Better Auth debe mantenerse sincronizado con el adaptador.
- Better Auth autentica; las reglas de rol, estado y nivel siguen siendo responsabilidad del servidor HAIC.
- Cambiar proveedor o esquema exige migración y una especificación independiente.

