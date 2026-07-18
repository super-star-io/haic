# HAIC Engineering Harness

Este directorio es la fuente de verdad para construir la plataforma HAIC con desarrollo guiado por especificaciones (SDD).

## Flujo obligatorio

1. Crear una carpeta `specs/NNN-nombre-corto/` copiando las plantillas.
2. Completar y aprobar `spec.md` antes de modificar código.
3. Definir arquitectura y riesgos en `plan.md`.
4. Dividir el trabajo verificable en `tasks.md`.
5. Implementar una tarea a la vez, sin ampliar el alcance silenciosamente.
6. Registrar pruebas y evidencia en `verification.md`.
7. Crear un ADR en `decisions/` si cambia una decisión arquitectónica.

## Puertas de calidad

- Ningún cambio de autenticación, autorización, roles o base de datos se implementa sin análisis de seguridad.
- Los permisos se validan en el servidor; ocultar elementos en la interfaz no es autorización.
- No se almacenan secretos, tokens ni credenciales en Git.
- Las migraciones deben ser explícitas, revisables y, cuando sea posible, aditivas.
- No se publica ni despliega la plataforma sin autorización explícita del propietario.
- Una funcionalidad no está terminada sin evidencia de lint, build, pruebas relevantes y revisión manual.

## Estructura

- `context/`: producto, arquitectura e invariantes vigentes.
- `process/`: proceso SDD y definición de terminado.
- `templates/`: documentos que inicia cada cambio.
- `specs/`: especificaciones activas e históricas.
- `decisions/`: registros de decisiones arquitectónicas (ADR).
- `checklists/`: controles de seguridad y entrega.
- `prompts/`: instrucciones reutilizables para continuar con agentes.
- `scripts/`: validadores locales del harness.

Validación local:

```bash
node harness/scripts/validate.mjs
```

