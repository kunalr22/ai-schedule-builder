-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "overrideId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_overrideId_fkey" FOREIGN KEY ("overrideId") REFERENCES "public"."Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
