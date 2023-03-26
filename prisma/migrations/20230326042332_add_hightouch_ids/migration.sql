-- AlterTable
ALTER TABLE "collection_repository" DROP CONSTRAINT "collection_repository_pkey",
ADD COLUMN     "hightouch_id" TEXT NOT NULL,
ADD CONSTRAINT "collection_repository_pkey" PRIMARY KEY ("hightouch_id");

-- AlterTable
ALTER TABLE "report" DROP CONSTRAINT "report_pkey",
ADD COLUMN     "hightouch_id" TEXT NOT NULL,
ADD CONSTRAINT "report_pkey" PRIMARY KEY ("hightouch_id");

-- AlterTable
ALTER TABLE "segment_topic" DROP CONSTRAINT "segment_topic_pkey",
ADD COLUMN     "hightouch_id" TEXT NOT NULL,
ADD CONSTRAINT "segment_topic_pkey" PRIMARY KEY ("hightouch_id");
