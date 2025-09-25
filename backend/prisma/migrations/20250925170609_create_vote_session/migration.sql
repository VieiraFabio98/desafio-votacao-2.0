/*
  Warnings:

  - Changed the type of `status` on the `agenda` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."agenda" DROP COLUMN "status",
ADD COLUMN     "status" "public"."VoteStatus" NOT NULL;

-- CreateTable
CREATE TABLE "public"."vote_sessions" (
    "id" TEXT NOT NULL,
    "agenda_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vote_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vote_sessions_agendaId_key" ON "public"."vote_sessions"("agenda_id");

-- AddForeignKey
ALTER TABLE "public"."vote_sessions" ADD CONSTRAINT "vote_sessions_agendaId_fkey" FOREIGN KEY ("agenda_id") REFERENCES "public"."agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
