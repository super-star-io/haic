# Verificación — 001

## Evidencia por criterio

| Criterio | Método | Resultado | Evidencia |
|---|---|---|---|
| CA-01 | Consulta D1 local por slug | passed | ID `example-tensorflow-models-001` |
| CA-02 | Consulta de campos | passed | Estado `published`, nivel 1 y ambas URLs presentes |
| CA-03 | Revisión de `doc.md` y lint | passed | Ejemplos usan `<SESIÓN_LOCAL>` y ESLint finalizó sin errores |
| CA-04 | Consulta de `audit_logs` | passed | Acción `post.create` para el ID de la entrada |

## Comandos ejecutados

```text
node harness/scripts/validate.mjs
npm run lint
npx wrangler d1 execute site-creator-d1 --local --config wrangler.local.jsonc --command "SELECT ..."
```

El harness reportó 15 archivos requeridos presentes. ESLint terminó con código 0.

## Alcance operativo

Sólo se modificó D1 local. No se realizaron despliegues ni escrituras remotas.

## Resultado

`passed`
