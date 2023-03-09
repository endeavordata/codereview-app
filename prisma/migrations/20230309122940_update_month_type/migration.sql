/*
  Warnings:

  - The `month` column on the `reports_repository_segment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "reports_repository_segment" DROP COLUMN "month",
ADD COLUMN     "month" TIMESTAMP(3)[];
