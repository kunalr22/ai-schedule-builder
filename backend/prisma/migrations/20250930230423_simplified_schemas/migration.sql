/*
  Warnings:

  - You are about to drop the column `allDay` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `EventOccurrence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."EventOccurrence" DROP CONSTRAINT "EventOccurrence_eventId_fkey";

-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "allDay",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."EventOccurrence";
