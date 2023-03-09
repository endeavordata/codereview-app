-- CreateTable
CREATE TABLE "reports_repository_segment" (
    "slug" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "new_stars" INTEGER[],
    "sitewide_new_stars" INTEGER[],
    "fraction_of_sitewide_stars" DOUBLE PRECISION[],
    "committers" INTEGER[],
    "sitewide_committers" INTEGER[],
    "fraction_of_sitewide_committers" DOUBLE PRECISION[],

    CONSTRAINT "reports_repository_segment_pkey" PRIMARY KEY ("slug")
);
