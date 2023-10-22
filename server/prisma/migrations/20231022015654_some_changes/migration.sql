/*
  Warnings:

  - Added the required column `last_membership` to the `community_memberships` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_community_memberships" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "community_id" TEXT NOT NULL,
    "last_membership" TEXT NOT NULL,
    "user_wallet" TEXT NOT NULL,
    CONSTRAINT "community_memberships_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "community_memberships_user_wallet_fkey" FOREIGN KEY ("user_wallet") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_community_memberships" ("community_id", "id", "user_wallet") SELECT "community_id", "id", "user_wallet" FROM "community_memberships";
DROP TABLE "community_memberships";
ALTER TABLE "new_community_memberships" RENAME TO "community_memberships";
CREATE TABLE "new_communities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text_content" TEXT NOT NULL,
    "creation_date" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    CONSTRAINT "communities_creator_fkey" FOREIGN KEY ("creator") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_communities" ("creation_date", "creator", "id", "text_content") SELECT "creation_date", "creator", "id", "text_content" FROM "communities";
DROP TABLE "communities";
ALTER TABLE "new_communities" RENAME TO "communities";
CREATE UNIQUE INDEX "communities_id_key" ON "communities"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
