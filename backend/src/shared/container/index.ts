import { AgendaRepository } from "@modules/agenda/infra/agenda-repository";
import { IAgendaRepository } from "@modules/agenda/repositories/i-agenda-repository";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";
import { prisma } from "@shared/infra/prisma";

container.register<PrismaClient>('PrismaClient', {
  useValue: prisma,
});
container.registerSingleton<IAgendaRepository>('AgendaRepository', AgendaRepository)