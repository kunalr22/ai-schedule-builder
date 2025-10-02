/*
  Warnings:

  - Made the column `recurrenceRule` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "recurrenceRule" SET NOT NULL;
