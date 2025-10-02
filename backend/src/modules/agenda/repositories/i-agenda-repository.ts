import { PrismaClient, Agenda, VoteStatus } from "@prisma/client"
import { ICreateAgendaDTO } from "../dto/i-create-agenda-dto"
import { IListRequestDTO } from "../dto/i-list-request-dto"


interface IAgendaRepository {
  create(data: ICreateAgendaDTO, prismaClient: PrismaClient): Promise<Agenda>
  list(data: IListRequestDTO): Promise<Agenda[]>
  getBySessionId(sessionId: string): Promise<Agenda | null>
  updateStatus(id: string, status: VoteStatus): Promise<void>
}

export { IAgendaRepository }