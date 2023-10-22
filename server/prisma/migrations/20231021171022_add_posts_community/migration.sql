/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text_content" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "creator" TEXT NOT NULL,
    CONSTRAINT "posts_creator_fkey" FOREIGN KEY ("creator") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "communities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text_content" TEXT NOT NULL,
    "creation_date" DATETIME NOT NULL,
    "creator" TEXT NOT NULL,
    CONSTRAINT "communities_creator_fkey" FOREIGN KEY ("creator") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "communities_id_key" ON "communities"("id");
