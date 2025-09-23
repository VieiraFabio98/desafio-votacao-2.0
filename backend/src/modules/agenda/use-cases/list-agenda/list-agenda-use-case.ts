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

      return ok(agenda)
      

    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { ListAgendaUseCase }