-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('POLITICA', 'ESPORTES', 'TECNOLOGIA', 'EDUCAÇÃO', 'OUTROS');

-- CreateTable
CREATE TABLE "public"."agenda" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "ini_vote_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);
