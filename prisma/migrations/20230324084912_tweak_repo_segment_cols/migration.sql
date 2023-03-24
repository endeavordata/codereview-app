/*
  Warnings:

  - You are about to drop the column `name` on the `repository_segment` table. All the data in the column will be lost.
  - Added the required column `display_name` to the `repository_segment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `repository_segment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repository_segment" DROP COLUMN "name",
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;
