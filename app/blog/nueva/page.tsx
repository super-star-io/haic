import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { canCreatePosts, currentMember } from "../../../lib/access";
import AdminPanel from "../../admin/AdminPanel";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  await requireChatGPTUser("/blog/nueva");
  const member = await currentMember();
  if (!member) redirect("/registro?return_to=%2Fblog%2Fnueva");
  if (member.status !== "active") redirect("/perfil");
  if (!canCreatePosts(member.role)) redirect("/blog");

  return <AdminPanel canPosts={false} canUsers={false} isSuper={false} canCreate={true} />;
}
