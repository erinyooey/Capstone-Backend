-- CreateTable
CREATE TABLE "favoriteRestaurant" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "operationTime" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "favoriteRestaurant_pkey" PRIMARY KEY ("id")
);
