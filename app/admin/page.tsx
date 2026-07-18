import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { canEdit, canManageUsers, currentMember } from "../../lib/access";
import AdminPanel from "./AdminPanel";

export const dynamic = "force-dynamic";
export default async function AdminPage(){await requireChatGPTUser("/admin");const member=await currentMember();if(!member)redirect("/registro");if(!canEdit(member.role))redirect("/perfil");return <AdminPanel canUsers={canManageUsers(member.role)} isSuper={member.role==="superadmin"}/>}
