-- CreateTable
CREATE TABLE "public"."votes" (
    "id" TEXT NOT NULL,
    "vote_sessions_id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "vote" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "votes_cpf_vote_sessions_id_key" ON "public"."votes"("cpf", "vote_sessions_id");

-- RenameForeignKey
ALTER TABLE "public"."vote_sessions" RENAME CONSTRAINT "vote_sessions_agendaId_fkey" TO "vote_sessions_agenda_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_vote_sessions_id_fkey" FOREIGN KEY ("vote_sessions_id") REFERENCES "public"."vote_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "public"."vote_sessions_agendaId_key" RENAME TO "vote_sessions_agenda_id_key";
