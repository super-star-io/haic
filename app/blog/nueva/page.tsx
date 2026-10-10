import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { canCreatePosts, currentMember } from "../../../lib/access";
import UserMenu from "../../UserMenu";
import NewPostForm from "./NewPostForm";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  await requireChatGPTUser("/blog/nueva");
  const member = await currentMember();
  if (!member) redirect("/registro?return_to=%2Fblog%2Fnueva");
  if (member.status !== "active") redirect("/perfil");
  if (!canCreatePosts(member.role)) redirect("/blog");

  return <main className="content-page"><header className="content-header"><a href="/"><img src="/haic-logo.svg" alt="HAIC" /></a><nav aria-label="Navegación principal"><a href="/">Inicio</a><a href="/blog">Blog</a><a href="/participar">Participar</a><UserMenu /></nav></header><section className="content-hero contributor-form-hero"><span className="kicker">PUBLICAR EN HAIC</span><h1>Comparte lo que construyes.</h1><p>Tu entrada se guardará como borrador para revisión antes de publicarse.</p></section><NewPostForm /></main>;
}
