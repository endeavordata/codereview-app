-- AlterTable
ALTER TABLE "github_repositories" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "homepage_url" DROP NOT NULL,
ALTER COLUMN "mirror_url" DROP NOT NULL,
ALTER COLUMN "mirror_url" SET DATA TYPE TEXT,
ALTER COLUMN "primary_language" DROP NOT NULL;
