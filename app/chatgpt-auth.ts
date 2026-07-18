import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
export type ChatGPTUser = { displayName: string; email: string; fullName: string | null };
export async function getChatGPTUser(): Promise<ChatGPTUser | null> { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user?.email) return null; return { displayName: session.user.name || session.user.email, email: session.user.email, fullName: session.user.name || null }; }
export async function requireChatGPTUser(returnTo: string): Promise<ChatGPTUser> { const user = await getChatGPTUser(); if (user) return user; redirect(`/registro?return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`); }
export function chatGPTSignInPath(returnTo: string): string { return `/registro?return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`; }
export function chatGPTSignOutPath(returnTo = "/"): string { return `/salir?return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`; }
function safeRelativeReturnPath(value: string) { return value.startsWith("/") && !value.startsWith("//") ? value : "/"; }
