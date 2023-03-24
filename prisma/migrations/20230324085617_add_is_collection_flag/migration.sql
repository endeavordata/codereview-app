/*
  Warnings:

  - Added the required column `is_collection` to the `repository_segment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repository_segment" ADD COLUMN     "is_collection" BOOLEAN NOT NULL;
