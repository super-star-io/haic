# Plan de implementación — 002

## Resumen técnico

Agregar `posts.show_on_home`, exponer un endpoint público de sólo lectura, ampliar los contratos administrativos y reemplazar el arreglo local de la HOME por carga dinámica.

## Componentes afectados

| Área | Cambio |
|---|---|
| Drizzle/D1 | Columna booleana `show_on_home` con default 0 |
| API admin | Leer y persistir la bandera |
| API pública | `GET /api/home` con campos editoriales limitados |
| Administrador | Checkbox “Mostrar en HOME” |
| HOME | Proyectos, filtros, conteos y sesión derivados de D1 |
| D1 local | Tres publicaciones destacadas de muestra |

## Seguridad

La escritura conserva el control editorial existente. El endpoint público filtra simultáneamente `status=published` y `showOnHome=true`; no expone autor, contenido completo ni datos de usuarios.

## Migración y recuperación

La columna es aditiva, `NOT NULL DEFAULT 0`. La reversión funcional consiste en desactivar todas las banderas; no es necesario eliminar datos.

## Pruebas

Migración local, consultas D1, lint, build, prueba HTTP del endpoint y revisión de HTML/estado visual.

