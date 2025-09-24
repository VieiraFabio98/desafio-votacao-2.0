import { IListRequestDTO } from "@modules/agenda/dto/i-list-request-dto"
import { IAgendaRepository } from "@modules/agenda/repositories/i-agenda-repository"
import { PrismaClient } from "@prisma/client"
import { HttpResponse, ok, serverError } from "@shared/helpers"
import { inject, injectable } from "tsyringe"


@injectable()
class ListAgendaUseCase {
  constructor(
    @inject('AgendaRepository')
    private agendaRepositroy: IAgendaRepository,
    @inject('PrismaClient')
    private prisma: PrismaClient
  ){}

  async execute({
    search,
    page,
    rowsPerPage,
    order,
    filter
  }: IListRequestDTO): Promise<HttpResponse> {
    try {

      const agenda = await this.agendaRepositroy.list({
        search,
        page,
        rowsPerPage,
        order,
        filter
      })

      const formatedAgenda = agenda.map(item => {
        return {
          ...item,
          iniVoteTime: this.convertTime(item.iniVoteTime)
        }
      })

      return ok(formatedAgenda)
      

    } catch(error) {
      return serverError(error as Error)
    }
  }

  convertTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }
}

export { ListAgendaUseCase }