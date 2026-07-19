import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps public media optimized and responsive", async () => {
  const responsiveImage = await readFile(new URL("app/ResponsiveImage.tsx", root), "utf8");
  const files = await readdir(new URL("public/projects/", root));

  assert.match(responsiveImage, /srcSet/);
  assert.match(responsiveImage, /decoding="async"/);
  assert.ok(files.every((file) => file.endsWith(".avif")));

  const publicAssets = await stat(new URL("public/", root));
  assert.ok(publicAssets.isDirectory());
  await assert.rejects(access(new URL("public/og.png", root)));
  await access(new URL("public/og.jpg", root));
});

test("does not load YouTube before user interaction", async () => {
  const player = await readFile(new URL("app/YoutubeLite.tsx", root), "utf8");
  assert.match(player, /onClick=\{\(\)=>setActive\(true\)\}/);
  assert.match(player, /active\?<iframe/);
  assert.match(player, /autoplay=1/);
});

test("renders HOME data from the server without a client fetch", async () => {
  const [page, content] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/HomeContent.tsx", root), "utf8"),
  ]);
  assert.match(page, /await getDb\(\)/);
  assert.match(page, /<HomeContent initialProjects=\{initialProjects\} hasProjectAccess=\{hasProjectAccess\}/);
  assert.doesNotMatch(content, /fetch\("\/api\/home"/);
});

test("gates project content behind an active session", async () => {
  const [home, blog, detail, homeApi] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/blog/page.tsx", root), "utf8"),
    readFile(new URL("app/blog/[slug]/page.tsx", root), "utf8"),
    readFile(new URL("app/api/home/route.ts", root), "utf8"),
  ]);
  assert.match(home, /hasProjectAccess/);
  assert.match(home, /hasProjectAccess \? await getDb\(\)/);
  assert.match(blog, /requireChatGPTUser\("\/blog"\)/);
  assert.ok(blog.indexOf("requireChatGPTUser") < blog.indexOf("select().from(posts)"));
  assert.ok(detail.indexOf("requireChatGPTUser") < detail.indexOf("select().from(posts)"));
  assert.match(homeApi, /status: 401/);
  assert.match(homeApi, /status: 403/);
});

test("uses standard registrations and superadmin-only editorial access", async () => {
  const [schema, authentication, accessRules, postApi] = await Promise.all([
    readFile(new URL("db/schema.ts", root), "utf8"),
    readFile(new URL("lib/auth.ts", root), "utf8"),
    readFile(new URL("lib/access.ts", root), "utf8"),
    readFile(new URL("app/api/admin/posts/route.ts", root), "utf8"),
  ]);
  assert.match(schema, /default\("standard"\)/);
  assert.match(authentication, /defaultValue: "standard"/);
  assert.match(accessRules, /canEdit\(role: string\) \{ return role === "superadmin"; \}/);
  assert.match(postApi, /!canEdit\(member\.role\)/);
  assert.doesNotMatch(`${schema}${authentication}${accessRules}`, /"editor"/);
});

test("persists and initializes the account theme", async () => {
  const [schema, layout, controller, profile, endpoint, themeCss] = await Promise.all([
    readFile(new URL("db/schema.ts", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/ThemeController.tsx", root), "utf8"),
    readFile(new URL("app/perfil/ThemePreference.tsx", root), "utf8"),
    readFile(new URL("app/api/me/theme/route.ts", root), "utf8"),
    readFile(new URL("app/theme.css", root), "utf8"),
  ]);
  assert.match(schema, /theme: text\("theme"/);
  assert.match(schema, /\["light", "dark", "system"\]/);
  assert.match(layout, /haic-theme/);
  assert.match(controller, /prefers-color-scheme: dark/);
  assert.match(controller, /fetch\("\/api\/me"/);
  assert.match(profile, /role="radiogroup"/);
  assert.match(endpoint, /requireMember\(\)/);
  assert.match(endpoint, /status: 400/);
  assert.match(themeCss, /data-resolved-theme="dark"/);
});

test("uses static metadata and no bundled web font", async () => {
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  assert.match(layout, /export const metadata: Metadata/);
  assert.doesNotMatch(layout, /next\/font|headers\(\)|Geist/);
  await assert.rejects(access(new URL(".next/static/media/Geist.woff2", root)));
});

test("targets Node and PostgreSQL for Dokploy", async () => {
  const [database, schema, dockerfile] = await Promise.all([
    readFile(new URL("db/index.ts", root), "utf8"),
    readFile(new URL("db/schema.ts", root), "utf8"),
    readFile(new URL("Dockerfile", root), "utf8"),
  ]);
  assert.match(database, /drizzle-orm\/postgres-js/);
  assert.match(database, /getRuntimeEnv/);
  assert.doesNotMatch(database, /cloudflare:workers|drizzle-orm\/d1/);
  assert.match(schema, /pgTable/);
  assert.match(dockerfile, /FROM node:22-alpine/);
  assert.match(dockerfile, /USER nextjs/);
});

test("validates development and production configuration", async () => {
  const environment = await readFile(new URL("lib/env.ts", root), "utf8");
  assert.match(environment, /Production URLs must use HTTPS/);
  assert.match(environment, /same origin/);
  assert.match(environment, /at least 32 characters/);
  assert.match(environment, /GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured together/);
  assert.match(environment, /postgresql:/);
});
