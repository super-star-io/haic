import { eq } from "drizzle-orm";
import { getChatGPTUser } from "../app/chatgpt-auth";
import { getDb } from "../db";
import { users } from "../db/schema";
import { getRuntimeEnv } from "./env";

export type Role = "standard" | "admin" | "superadmin";
export const roleLabels: Record<Role, string> = { standard: "Estándar", admin: "Administrador", superadmin: "Superusuario" };

export async function currentMember() {
  const identity = await getChatGPTUser();
  if (!identity) return null;
  const [member] = await getDb().select().from(users).where(eq(users.email, identity.email.toLowerCase())).limit(1);
  return member ?? null;
}

export async function requireMember() {
  const member = await currentMember();
  if (!member || member.status !== "active") return null;
  return member;
}

export function canEdit(role: string) { return role === "superadmin"; }
export function canManageUsers(role: string) { return role === "admin" || role === "superadmin"; }

export function bootstrapRole(email: string): Role {
  const configured = getRuntimeEnv().bootstrapSuperuserEmail;
  return configured && configured === email.toLowerCase() ? "superadmin" : "standard";
}

export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}
