/*
  Warnings:

  - You are about to drop the column `limit` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `pictureUrl` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "limit",
DROP COLUMN "location",
DROP COLUMN "pictureUrl";
