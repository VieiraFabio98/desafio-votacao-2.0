import { PrismaClient, Agenda } from "@prisma/client"
import { ICreateAgendaDTO } from "../dto/i-create-agenda-dto"


interface IAgendaRepository {
  create(data: ICreateAgendaDTO, prismaClient: PrismaClient): Promise<Agenda>
}

export { IAgendaRepository }