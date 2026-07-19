UPDATE "users" SET "role" = 'standard' WHERE "role" IN ('member', 'contributor', 'editor');
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'standard';
