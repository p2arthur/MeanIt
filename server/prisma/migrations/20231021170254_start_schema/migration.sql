-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wallet_address" TEXT NOT NULL,
    "nfd_username" TEXT NOT NULL,
    "meanit_username" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text_content" TEXT NOT NULL,
    "media" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    CONSTRAINT "Post_creator_fkey" FOREIGN KEY ("creator") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_address_key" ON "users"("wallet_address");
