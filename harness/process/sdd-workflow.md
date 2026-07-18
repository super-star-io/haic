# Proceso SDD

## 1. Descubrir

Confirmar el problema observable, usuarios afectados, evidencia disponible y restricciones. Separar hechos de hipótesis.

## 2. Especificar

Crear `spec.md` con historias, requisitos funcionales, requisitos no funcionales, casos límite y criterios de aceptación medibles. Estado inicial: `draft`.

## 3. Aprobar alcance

Cambiar el estado a `approved` cuando el propietario acepte el comportamiento esperado. Las dudas que alteren producto, seguridad o datos deben resolverse antes de implementar.

## 4. Planear

Crear `plan.md`: componentes afectados, modelo de datos, contratos, permisos, migraciones, riesgos y estrategia de prueba. Registrar alternativas descartadas cuando sean relevantes.

## 5. Dividir

Crear `tasks.md` con unidades pequeñas, ordenadas y verificables. Cada tarea declara archivos previstos y prueba asociada.

## 6. Implementar

Trabajar sólo dentro del alcance aprobado. Un descubrimiento que cambie requisitos regresa la especificación a revisión.

## 7. Verificar

Completar `verification.md` con comandos, resultados, pruebas manuales, riesgos residuales y evidencia de cada criterio de aceptación.

## 8. Cerrar

Estado `verified` únicamente cuando todos los criterios pasan. Actualizar contexto y ADR si la solución cambió el sistema.

## Estados permitidos

`draft` → `approved` → `in-progress` → `verified` → `archived`

También puede usarse `blocked` indicando causa y condición de desbloqueo.

