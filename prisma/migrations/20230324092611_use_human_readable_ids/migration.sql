-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_repository_segment_id_fkey";

-- DropForeignKey
ALTER TABLE "segment_primary_language" DROP CONSTRAINT "segment_primary_language_segment_id_fkey";

-- DropForeignKey
ALTER TABLE "segment_repository" DROP CONSTRAINT "segment_repository_segment_id_fkey";

-- DropForeignKey
ALTER TABLE "segment_topic" DROP CONSTRAINT "segment_topic_segment_id_fkey";

-- AlterTable
ALTER TABLE "report" DROP CONSTRAINT "report_pkey",
DROP COLUMN "description",
DROP COLUMN "id",
DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "entity_id" TEXT NOT NULL,
ADD COLUMN     "report_type" TEXT NOT NULL,
ADD CONSTRAINT "report_pkey" PRIMARY KEY ("report_type", "entity_id");

-- AlterTable
ALTER TABLE "repository_segment" DROP CONSTRAINT "repository_segment_pkey",
DROP COLUMN "id",
ADD COLUMN     "description" TEXT,
ADD CONSTRAINT "repository_segment_pkey" PRIMARY KEY ("slug");

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_repository_segment_id_fkey" FOREIGN KEY ("repository_segment_id") REFERENCES "repository_segment"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "segment_topic" ADD CONSTRAINT "segment_topic_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "repository_segment"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "segment_primary_language" ADD CONSTRAINT "segment_primary_language_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "repository_segment"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "segment_repository" ADD CONSTRAINT "segment_repository_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "repository_segment"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
