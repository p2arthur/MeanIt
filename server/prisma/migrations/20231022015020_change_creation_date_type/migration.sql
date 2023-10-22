-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text_content" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "creation_date" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    CONSTRAINT "posts_creator_fkey" FOREIGN KEY ("creator") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_posts" ("creation_date", "creator", "id", "media", "text_content") SELECT "creation_date", "creator", "id", "media", "text_content" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
