-- CreateTable
CREATE TABLE "Repository" (
    "name_with_owner" TEXT NOT NULL,
    "observed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "pushed_at" TIMESTAMP(3),
    "description" TEXT,
    "stargazer_count" INTEGER NOT NULL,
    "fork_count" INTEGER NOT NULL,
    "homepage_url" TEXT,
    "is_archived" BOOLEAN NOT NULL,
    "is_fork" BOOLEAN NOT NULL,
    "is_mirror" BOOLEAN NOT NULL,
    "mirror_url" TEXT,
    "primary_language" TEXT,
    "topic_names" TEXT[],
    "language_names" TEXT[],
    "language_sizes" INTEGER[],

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("name_with_owner")
);

-- CreateTable
CREATE TABLE "Topic" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ProgrammingLanguage" (
    "name" TEXT NOT NULL,

    CONSTRAINT "ProgrammingLanguage_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "refreshed_at" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "repository_segment_id" TEXT,
    "data" JSONB,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepositorySegment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "topics_required" INTEGER,
    "topics_in_description" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RepositorySegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SegmentTopic" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "segment_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "SegmentTopic_pkey" PRIMARY KEY ("segment_id","topic_id")
);

-- CreateTable
CREATE TABLE "SegmentPrimaryLanguage" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "segment_id" TEXT NOT NULL,
    "primary_language_id" TEXT NOT NULL,

    CONSTRAINT "SegmentPrimaryLanguage_pkey" PRIMARY KEY ("segment_id","primary_language_id")
);

-- CreateTable
CREATE TABLE "SegmentRepository" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "segment_id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,

    CONSTRAINT "SegmentRepository_pkey" PRIMARY KEY ("segment_id","repository_id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_repository_segment_id_fkey" FOREIGN KEY ("repository_segment_id") REFERENCES "RepositorySegment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentTopic" ADD CONSTRAINT "SegmentTopic_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "RepositorySegment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentTopic" ADD CONSTRAINT "SegmentTopic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentPrimaryLanguage" ADD CONSTRAINT "SegmentPrimaryLanguage_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "RepositorySegment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentPrimaryLanguage" ADD CONSTRAINT "SegmentPrimaryLanguage_primary_language_id_fkey" FOREIGN KEY ("primary_language_id") REFERENCES "ProgrammingLanguage"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentRepository" ADD CONSTRAINT "SegmentRepository_segment_id_fkey" FOREIGN KEY ("segment_id") REFERENCES "RepositorySegment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentRepository" ADD CONSTRAINT "SegmentRepository_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "Repository"("name_with_owner") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Grant access for Hightouch user
GRANT USAGE, CREATE ON SCHEMA public TO hightouch;
GRANT ALL ON "Report" to hightouch;
GRANT ALL ON "Repository" to hightouch;
GRANT ALL ON "Topic" to hightouch;
GRANT ALL ON "ProgrammingLanguage" to hightouch;
