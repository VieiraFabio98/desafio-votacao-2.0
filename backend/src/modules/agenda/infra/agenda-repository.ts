import { IAgendaRepository } from "../repositories/i-agenda-repository"
import { PrismaClient } from "@prisma/client"
import { Agenda } from "@prisma/client"
import { ICreateAgendaDTO } from "@modules/agenda/dto/i-create-agenda-dto"


class AgendaRepository implements IAgendaRepository {
  async create(data: ICreateAgendaDTO, prismaClient: PrismaClient): Promise<Agenda> {
    try {
      const agenda = await prismaClient.agenda.create({
        data: {
          title: data.title,
          description: data.description,
          category: data.category,
          iniVoteDate: data.iniVoteDate,
          iniVoteTime: data.iniVoteTime,
          status: "AGUARDANDO",
        }
      })

      return agenda

    } catch(error) {
      throw error
    }
  }

}

export { AgendaRepository }