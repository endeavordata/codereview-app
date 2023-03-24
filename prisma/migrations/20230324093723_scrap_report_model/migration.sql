-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_repository_segment_id_fkey";

-- AlterTable
ALTER TABLE "repository_segment" ADD COLUMN     "payload" JSONB,
ADD COLUMN     "payload_refreshed_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "report";
