# Configuración anterior de Cloudflare

Los archivos `.openai/hosting.json`, `vite.config.ts`, `wrangler.local.jsonc`, `worker/`, `build/`, `examples/`, `drizzle/` y el estado `.wrangler/` pertenecen al runtime anterior basado en vinext y D1.

No forman parte del build Docker ni del despliegue en Dokploy. Se conservan temporalmente únicamente como referencia y para poder exportar la base D1 local mediante `npm run db:export:d1`. Cuando la importación en PostgreSQL y el primer backup de producción hayan sido verificados, pueden archivarse fuera de la rama de producción.
