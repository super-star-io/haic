# Verificación — 002

## Evidencia por criterio

| Criterio | Resultado | Evidencia |
|---|---|---|
| CA-01 | passed | Migración `0002_lying_dark_beast.sql`; POST y PATCH persisten `showOnHome` |
| CA-02 | passed | Formulario visualizado con checkbox marcado; listado muestra `published · HOME` |
| CA-03 | passed | `GET /api/home` respondió 200, `no-store` y tres publicaciones destacadas |
| CA-04 | passed | HOME renderizó tres tarjetas con slugs reales, métricas `03/01` y sesión de TensorFlow |
| CA-05 | passed | Consulta D1 devolvió YOLO, Prophet y TensorFlow; cero destacados no publicados |

## Comandos y recorridos

```text
npm run lint
npm run build
node harness/scripts/validate.mjs
npm run db:local:migrate
curl http://localhost:3000/api/home
```

- ESLint: código 0.
- Build vinext: correcto; ruta `/api/home` incluida.
- Harness: válido.
- Revisión visual local: tres tarjetas dinámicas, enlaces correctos y bandera editable marcada.
- Persistencia: sólo D1 local; ninguna escritura remota.

## Resultado

`passed`
