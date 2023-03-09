-- CreateTable
CREATE TABLE "github_repositories" (
    "name_with_owner" TEXT NOT NULL,
    "observed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "stargazer_count" INTEGER NOT NULL,
    "fork_count" INTEGER NOT NULL,
    "homepage_url" TEXT NOT NULL,
    "is_archived" BOOLEAN NOT NULL,
    "is_fork" BOOLEAN NOT NULL,
    "is_mirror" BOOLEAN NOT NULL,
    "mirror_url" BOOLEAN NOT NULL,
    "primary_language" TEXT NOT NULL,
    "pushed_at" TIMESTAMP(3) NOT NULL,
    "topic_names" TEXT[],
    "language_names" TEXT[],
    "language_sizes" INTEGER[],

    CONSTRAINT "github_repositories_pkey" PRIMARY KEY ("name_with_owner")
);
