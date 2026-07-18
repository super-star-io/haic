import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "../db";
import * as schema from "../db/schema";
import { getRuntimeEnv } from "./env";

const env = getRuntimeEnv();
export const auth = betterAuth({
  appName: "HAIC", baseURL: env.authUrl, secret: env.authSecret, trustedOrigins: [env.authUrl],
  database: drizzleAdapter(getDb(), { provider: "pg", schema: { ...schema, user: schema.users, session: schema.sessions, account: schema.accounts, verification: schema.verifications } }),
  user: { modelName: "users", additionalFields: { organization: { type: "string", required: false, defaultValue: "", input: false }, bio: { type: "string", required: false, defaultValue: "", input: false }, role: { type: "string", required: false, defaultValue: "member", input: false }, accessLevel: { type: "number", required: false, defaultValue: 1, input: false }, status: { type: "string", required: false, defaultValue: "active", input: false } } },
  session: { modelName: "sessions" }, account: { modelName: "accounts" }, verification: { modelName: "verifications" },
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: env.googleEnabled ? { google: { clientId: env.googleClientId!, clientSecret: env.googleClientSecret! } } : {}, plugins: [nextCookies()],
});
