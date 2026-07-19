import { boolean, integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

const createdAt = () => timestamp("created_at", { withTimezone: true, mode: "date" }).notNull();
const updatedAt = () => timestamp("updated_at", { withTimezone: true, mode: "date" }).notNull();

export const users = pgTable("users", {
  id: text("id").primaryKey(), email: text("email").notNull().unique(), emailVerified: boolean("email_verified").notNull().default(false), image: text("image"), name: text("name").notNull(), organization: text("organization").notNull().default(""), bio: text("bio").notNull().default(""), role: text("role", { enum: ["standard", "admin", "superadmin"] }).notNull().default("standard"), accessLevel: integer("access_level").notNull().default(1), status: text("status", { enum: ["active", "suspended"] }).notNull().default("active"), createdAt: createdAt(), updatedAt: updatedAt(),
}, (table) => [uniqueIndex("users_email_idx").on(table.email)]);

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(), expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(), token: text("token").notNull().unique(), createdAt: createdAt(), updatedAt: updatedAt(), ipAddress: text("ip_address"), userAgent: text("user_agent"), userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
}, (table) => [uniqueIndex("sessions_token_idx").on(table.token)]);

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(), accountId: text("account_id").notNull(), providerId: text("provider_id").notNull(), userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }), accessToken: text("access_token"), refreshToken: text("refresh_token"), idToken: text("id_token"), accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true, mode: "date" }), refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true, mode: "date" }), scope: text("scope"), password: text("password"), createdAt: createdAt(), updatedAt: updatedAt(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(), identifier: text("identifier").notNull(), value: text("value").notNull(), expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(), createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }), updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
});

export const posts = pgTable("posts", {
  id: text("id").primaryKey(), slug: text("slug").notNull().unique(), title: text("title").notNull(), excerpt: text("excerpt").notNull().default(""), content: text("content").notNull().default(""), category: text("category").notNull().default("Proyecto"), status: text("status", { enum: ["draft", "published", "archived"] }).notNull().default("draft"), requiredAccessLevel: integer("required_access_level").notNull().default(1), githubUrl: text("github_url").notNull().default(""), youtubeUrl: text("youtube_url").notNull().default(""), coverImageUrl: text("cover_image_url").notNull().default(""), showOnHome: boolean("show_on_home").notNull().default(false), authorId: text("author_id").notNull().references(() => users.id), publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }), createdAt: createdAt(), updatedAt: updatedAt(),
}, (table) => [uniqueIndex("posts_slug_idx").on(table.slug)]);

export const auditLogs = pgTable("audit_logs", {
  id: text("id").primaryKey(), actorId: text("actor_id").notNull().references(() => users.id), action: text("action").notNull(), entityType: text("entity_type").notNull(), entityId: text("entity_id").notNull(), detail: text("detail").notNull().default(""), createdAt: createdAt(),
});
