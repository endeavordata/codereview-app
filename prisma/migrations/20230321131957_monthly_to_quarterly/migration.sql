TRUNCATE TABLE "reports_repository_segment";

ALTER TABLE "reports_repository_segment" DROP COLUMN "month",
ADD COLUMN     "quarter" TEXT[];
