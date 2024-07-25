-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "writtenReview" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
