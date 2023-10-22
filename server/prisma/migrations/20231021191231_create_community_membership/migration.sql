-- CreateTable
CREATE TABLE "community_memberships" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "community_id" TEXT NOT NULL,
    "user_wallet" TEXT NOT NULL,
    CONSTRAINT "community_memberships_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "community_memberships_user_wallet_fkey" FOREIGN KEY ("user_wallet") REFERENCES "users" ("wallet_address") ON DELETE RESTRICT ON UPDATE CASCADE
);
