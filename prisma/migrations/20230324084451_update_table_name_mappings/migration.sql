-- AlterTable
ALTER TABLE "programming_language" RENAME CONSTRAINT "ProgrammingLanguage_pkey" TO "programming_language_pkey";

-- AlterTable
ALTER TABLE "report" RENAME CONSTRAINT "Report_pkey" TO "report_pkey";

-- AlterTable
ALTER TABLE "repository" RENAME CONSTRAINT "Repository_pkey" TO "repository_pkey";

-- AlterTable
ALTER TABLE "repository_segment" RENAME CONSTRAINT "RepositorySegment_pkey" TO "repository_segment_pkey";

-- AlterTable
ALTER TABLE "segment_primary_language" RENAME CONSTRAINT "SegmentPrimaryLanguage_pkey" TO "segment_primary_language_pkey";

-- AlterTable
ALTER TABLE "segment_repository" RENAME CONSTRAINT "SegmentRepository_pkey" TO "segment_repository_pkey";

-- AlterTable
ALTER TABLE "segment_topic" RENAME CONSTRAINT "SegmentTopic_pkey" TO "segment_topic_pkey";

-- AlterTable
ALTER TABLE "topic" RENAME CONSTRAINT "Topic_pkey" TO "topic_pkey";

-- RenameForeignKey
ALTER TABLE "report" RENAME CONSTRAINT "Report_repository_segment_id_fkey" TO "report_repository_segment_id_fkey";

-- RenameForeignKey
ALTER TABLE "segment_primary_language" RENAME CONSTRAINT "SegmentPrimaryLanguage_primary_language_id_fkey" TO "segment_primary_language_primary_language_id_fkey";

-- RenameForeignKey
ALTER TABLE "segment_primary_language" RENAME CONSTRAINT "SegmentPrimaryLanguage_segment_id_fkey" TO "segment_primary_language_segment_id_fkey";

-- RenameForeignKey
ALTER TABLE "segment_repository" RENAME CONSTRAINT "SegmentRepository_repository_id_fkey" TO "segment_repository_repository_id_fkey";

-- RenameForeignKey
ALTER TABLE "segment_repository" RENAME CONSTRAINT "SegmentRepository_segment_id_fkey" TO "segment_repository_segment_id_fkey";

-- RenameForeignKey
ALTER TABLE "segment_topic" RENAME CONSTRAINT "SegmentTopic_segment_id_fkey" TO "segment_topic_segment_id_fkey";

-- RenameForeignKey
ALTER TABLE "segment_topic" RENAME CONSTRAINT "SegmentTopic_topic_id_fkey" TO "segment_topic_topic_id_fkey";
