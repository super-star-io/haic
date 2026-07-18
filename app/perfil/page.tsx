import { redirect } from "next/navigation";
import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { currentMember, roleLabels, type Role } from "../../lib/access";

export const dynamic = "force-dynamic";
export default async function ProfilePage() {
  await requireChatGPTUser("/perfil"); const member = await currentMember();
  if (!member) redirect("/registro");
  return <main className="portal-shell"><a className="portal-brand" href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><section className="profile-card"><div className="avatar">{member.name.slice(0,2).toUpperCase()}</div><span className="role-pill">{roleLabels[member.role as Role]} · nivel {member.accessLevel}</span><h1>{member.name}</h1><p>{member.email}</p>{member.organization && <p>{member.organization}</p>}<div className="profile-actions"><a className="button primary" href="/blog">Explorar publicaciones →</a>{["editor","admin","superadmin"].includes(member.role) && <a className="button secondary" href="/admin">Abrir administrador</a>}<a className="text-link" href={chatGPTSignOutPath("/")}>Cerrar sesión</a></div></section></main>;
}
