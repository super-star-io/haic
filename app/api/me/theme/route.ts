import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { users } from "../../../../db/schema";
import { requireMember } from "../../../../lib/access";

const themes = ["light", "dark", "system"] as const;
type Theme = (typeof themes)[number];

export async function PATCH(request: Request) {
  const member = await requireMember();
  if (!member) return Response.json({ error: "Inicia sesión para guardar tu preferencia." }, { status: 401 });
  const body = await request.json().catch(() => null) as { theme?: Theme } | null;
  if (!body?.theme || !themes.includes(body.theme)) return Response.json({ error: "Tema inválido." }, { status: 400 });
  const [user] = await getDb().update(users).set({ theme: body.theme, updatedAt: new Date() }).where(eq(users.id, member.id)).returning({ theme: users.theme });
  return Response.json({ theme: user.theme });
}
