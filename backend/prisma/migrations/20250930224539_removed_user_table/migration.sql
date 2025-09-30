/*
  Warnings:

  - You are about to drop the column `userId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clerkId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."EventOccurrence" ADD COLUMN     "description" TEXT;

-- DropTable
DROP TABLE "public"."User";
