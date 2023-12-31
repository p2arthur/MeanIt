/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallet_address" TEXT NOT NULL,
    "nfd_username" TEXT NOT NULL,
    "meanit_username" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL
);
INSERT INTO "new_users" ("id", "meanit_username", "nfd_username", "profile_picture", "wallet_address") SELECT "id", "meanit_username", "nfd_username", "profile_picture", "wallet_address" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
CREATE UNIQUE INDEX "users_wallet_address_key" ON "users"("wallet_address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
