import { IAgendaRepository } from "../repositories/i-agenda-repository"
import { PrismaClient } from "@prisma/client"
import { Agenda } from "@prisma/client"
import { ICreateAgendaDTO } from "@modules/agenda/dto/i-create-agenda-dto"
import { IListRequestDTO } from "../dto/i-list-request-dto"

const prisma = new PrismaClient()

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
    page = 1,
    rowsPerPage = 10,
    order,
    filter
  }: IListRequestDTO): Promise<Agenda[]> {
    try {
      // Ordenação
      let columnName: keyof Agenda = "title"
      let columnDirection: "asc" | "desc" = "asc"

      if (order && order !== "") {
        columnName = order.startsWith("-")
          ? (order.substring(1) as keyof Agenda)
          : (order as keyof Agenda)

        columnDirection = order.startsWith("-") ? "desc" : "asc"
      }

      // Paginação
      const skip = page * rowsPerPage
      const take = rowsPerPage

      // Filtros dinâmicos (exemplo básico)
      const where: any = {}

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { status: { equals: search as string } }
        ]
      }

      if (filter) {
        Object.assign(where, filter) 
      }

      // Consulta
      const agendas = await prisma.agenda.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          iniVoteDate: true,
          iniVoteTime: true,
          status: true,
          createdAt: true,
          updatedAt: true
        },
        where,
        skip,
        take,
        orderBy: {
          createdAt: "asc"
        }
      })

      return agendas
    } catch (error) {
      throw error
    }
  }

  async getBySessionId(sessionId: string): Promise<Agenda | null> {
    try {

      const session = await prisma.voteSession.findUnique({
        where: { id: sessionId },
        include: {
          agenda: true
        }
      })

      return session?.agenda ?? null

    } catch(error) {
      throw error
    }
  }

}

export { AgendaRepository }