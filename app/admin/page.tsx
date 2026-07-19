import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { canEdit, canManageUsers, currentMember } from "../../lib/access";
import AdminPanel from "./AdminPanel";

export const dynamic = "force-dynamic";
export default async function AdminPage(){await requireChatGPTUser("/admin");const member=await currentMember();if(!member)redirect("/registro");const canPosts=canEdit(member.role);const canUsers=canManageUsers(member.role);if(member.status!=="active"||(!canPosts&&!canUsers))redirect("/perfil");return <AdminPanel canPosts={canPosts} canUsers={canUsers} isSuper={member.role==="superadmin"}/>}
