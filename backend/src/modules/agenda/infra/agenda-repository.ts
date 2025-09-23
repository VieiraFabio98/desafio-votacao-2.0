import { IAgendaRepository } from "../repositories/i-agenda-repository"
import { PrismaClient } from "@prisma/client"
import { Agenda } from "@prisma/client"
import { ICreateAgendaDTO } from "@modules/agenda/dto/i-create-agenda-dto"
import { IListRequestDTO } from "../dto/i-list-request-dto"


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

  async list({
    search,
    page,
    rowsPerPage,
    order,
    filter
  }: IListRequestDTO): Promise<Agenda> {
    try {
      let columnName: string
      let columnDirection: "ASC" | "DESC" 

      if (typeof order === "undefined" || order === "") {
        columnName = "title"
        columnDirection = "ASC"
      } else {
        columnName = order.substring(0, 1) === "-" ? order.substring(1) : order
        columnDirection = order.substring(0, 1) === "-" ? "DESC" : "ASC"
      }

    } catch(error) {
      throw error
    }
  }

}

export { AgendaRepository }