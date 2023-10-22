/*
  Warnings:

  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text_content" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "creator" TEXT NOT NULL,
    CONSTRAINT "posts_creator_fkey" FOREIGN KEY ("creator") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("creation_date", "creator", "id", "media", "text_content") SELECT "creation_date", "creator", "id", "media", "text_content" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
