-- DropForeignKey
ALTER TABLE "segment_repository" DROP CONSTRAINT "segment_repository_repository_id_fkey";

-- DropForeignKey
ALTER TABLE "segment_repository" DROP CONSTRAINT "segment_repository_segment_id_fkey";

-- AlterTable
ALTER TABLE "repository_segment" DROP COLUMN "created_at",
DROP COLUMN "is_collection",
DROP COLUMN "payload",
DROP COLUMN "payload_refreshed_at",
DROP COLUMN "updated_at";

-- DropTable
DROP TABLE "segment_repository";

-- CreateTable
CREATE TABLE "report" (
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "report_type" TEXT NOT NULL,
    "content" JSONB,

    CONSTRAINT "report_pkey" PRIMARY KEY ("entity_type","entity_id")
);

-- CreateTable
CREATE TABLE "repository_collection" (
    "slug" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "repository_collection_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "collection_repository" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collection_id" TEXT NOT NULL,
    "repository_id" TEXT NOT NULL,

    CONSTRAINT "collection_repository_pkey" PRIMARY KEY ("collection_id","repository_id")
);

-- AddForeignKey
ALTER TABLE "collection_repository" ADD CONSTRAINT "collection_repository_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "repository_collection"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_repository" ADD CONSTRAINT "collection_repository_repository_id_fkey" FOREIGN KEY ("repository_id") REFERENCES "repository"("name_with_owner") ON DELETE RESTRICT ON UPDATE CASCADE;
