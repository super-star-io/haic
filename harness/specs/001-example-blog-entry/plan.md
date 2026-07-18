# Plan de implementación — 001

## Resumen técnico

Insertar una entrada de muestra en D1 local con la misma forma producida por `POST /api/admin/posts`, vinculada al superadministrador existente. Documentar el endpoint sin alterar su implementación.

## Componentes y archivos afectados

| Área | Cambio previsto | Motivo |
|---|---|---|
| D1 local | Entrada y auditoría | Contenido de ejemplo |
| `doc.md` | Contrato y ejemplo HTTP | Referencia para integraciones |
| `harness/specs/001-*` | Especificación y evidencia | Cumplimiento SDD |

## Autenticación y autorización

El endpoint requiere una cookie de sesión válida y un usuario con rol `editor`, `admin` o `superadmin`. La documentación usa un marcador, nunca un token real.

## Compatibilidad y recuperación

La entrada puede archivarse desde `/admin` o eliminarse manualmente de D1 local por su slug. No se modifica el esquema.

## Estrategia de pruebas

Consultar entrada y auditoría directamente en D1; validar el harness; comprobar lint.

