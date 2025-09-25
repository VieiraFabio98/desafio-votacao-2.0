import { AgendaRepository } from "@modules/agenda/infra/agenda-repository";
import { IAgendaRepository } from "@modules/agenda/repositories/i-agenda-repository";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";
import { prisma } from "@shared/infra/prisma";
import { IVoteSessionsRepository } from "@modules/vote-session/repositories/i-vote-sessions-repository";
import { VoteSessionsRepository } from "@modules/vote-session/infra/vote-sessions-repository";

container.register<PrismaClient>('PrismaClient', {
  useValue: prisma,
});
container.registerSingleton<IAgendaRepository>('AgendaRepository', AgendaRepository)
container.registerSingleton<IVoteSessionsRepository>('VoteSessionsRepository', VoteSessionsRepository)