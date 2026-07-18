import { pathToFileURL } from "node:url";

export type RuntimeEnv = {
  nodeEnv: "development" | "test" | "production";
  isProduction: boolean;
  port: number;
  databaseUrl: string;
  authUrl: string;
  authSecret: string;
  siteUrl: string;
  googleEnabled: boolean;
  googleClientId?: string;
  googleClientSecret?: string;
  bootstrapSuperuserEmail?: string;
};

function validUrl(name: string, value: string, protocols: string[]) {
  try {
    const url = new URL(value);
    if (!protocols.includes(url.protocol)) throw new Error();
    return url;
  } catch {
    throw new Error(`${name} must be a valid ${protocols.join(" or ")} URL.`);
  }
}

function looksPlaceholder(value: string) {
  return /replace|change-me|example|internal_postgres_host/i.test(value);
}

export function getRuntimeEnv(source: NodeJS.ProcessEnv = process.env): RuntimeEnv {
  const nodeEnv = source.NODE_ENV === "production" ? "production" : source.NODE_ENV === "test" ? "test" : "development";
  const isProduction = nodeEnv === "production";
  const databaseUrl = source.DATABASE_URL?.trim();
  if (!databaseUrl) throw new Error("DATABASE_URL is required. Use PostgreSQL locally and in production.");
  validUrl("DATABASE_URL", databaseUrl, ["postgresql:", "postgres:"]);

  const authUrl = source.BETTER_AUTH_URL?.trim() || "http://localhost:3000";
  const siteUrl = source.NEXT_PUBLIC_SITE_URL?.trim() || (isProduction ? "https://haic-hidalgo.org" : "http://localhost:3000");
  const authOrigin = validUrl("BETTER_AUTH_URL", authUrl, ["http:", "https:"]).origin;
  const siteOrigin = validUrl("NEXT_PUBLIC_SITE_URL", siteUrl, ["http:", "https:"]).origin;
  if (authOrigin !== siteOrigin) throw new Error("BETTER_AUTH_URL and NEXT_PUBLIC_SITE_URL must use the same origin.");

  const authSecret = source.BETTER_AUTH_SECRET?.trim() || "local-development-secret-with-32-characters";
  if (isProduction) {
    const localProductionRun = [new URL(authOrigin).hostname, new URL(siteOrigin).hostname].every((hostname) => hostname === "localhost" || hostname === "127.0.0.1");
    if ((!authUrl.startsWith("https://") || !siteUrl.startsWith("https://")) && !localProductionRun) throw new Error("Production URLs must use HTTPS unless the production image is being tested on localhost.");
    if (authSecret.length < 32 || looksPlaceholder(authSecret)) throw new Error("BETTER_AUTH_SECRET must be a non-placeholder secret of at least 32 characters in production.");
    if (looksPlaceholder(databaseUrl) && !localProductionRun) throw new Error("DATABASE_URL still contains a placeholder.");
  }

  const googleClientId = source.GOOGLE_CLIENT_ID?.trim();
  const googleClientSecret = source.GOOGLE_CLIENT_SECRET?.trim();
  if (Boolean(googleClientId) !== Boolean(googleClientSecret)) throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured together.");

  const port = Number(source.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be an integer between 1 and 65535.");

  return { nodeEnv, isProduction, port, databaseUrl, authUrl: authOrigin, authSecret, siteUrl: siteOrigin, googleEnabled: Boolean(googleClientId && googleClientSecret), googleClientId, googleClientSecret, bootstrapSuperuserEmail: source.HAIC_BOOTSTRAP_SUPERUSER_EMAIL?.trim().toLowerCase() || undefined };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const env = getRuntimeEnv();
  console.log(JSON.stringify({ mode: env.nodeEnv, port: env.port, database: new URL(env.databaseUrl).hostname, authUrl: env.authUrl, siteUrl: env.siteUrl, googleEnabled: env.googleEnabled, bootstrapSuperuserEmail: env.bootstrapSuperuserEmail ?? null }, null, 2));
}
