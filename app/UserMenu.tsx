"use client";
import { authClient } from "../lib/auth-client";

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  async function signOut() {
    await authClient.signOut();
    window.location.assign("/");
  }
  if (isPending) return <span className="header-session-loading" aria-label="Comprobando sesión" />;
  if (!session?.user) return <a className="header-cta" href="/registro">Acceder <span>↗</span></a>;
  const initials = (session.user.name || session.user.email).split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  return <details className="user-menu"><summary><span className="user-avatar">{initials}</span><span className="user-label"><b>{session.user.name || "Mi cuenta"}</b><small>Miembro HAIC</small></span><span className="chevron">⌄</span></summary><div className="user-dropdown"><div><b>{session.user.name}</b><small>{session.user.email}</small></div><a href="/perfil">Ver mi perfil</a><a href="/blog">Publicaciones</a><button type="button" onClick={signOut}>Cerrar sesión</button></div></details>;
}
