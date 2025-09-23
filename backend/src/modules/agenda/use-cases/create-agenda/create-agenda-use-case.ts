import { IAgendaRepository } from "@modules/agenda/repositories/i-agenda-repository";
import { PrismaClient } from "@prisma/client";
import { created, HttpResponse, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";
import { ICreateAgendaDTO } from "@modules/agenda/dto/i-create-agenda-dto";


@injectable()
class CreateAgendaUseCase {
  constructor(
    @inject('AgendaRepository')
    private agendaRepositroy: IAgendaRepository,
    @inject('PrismaClient')
    private prisma: PrismaClient
  ){}

  async execute({
    title,
    description,
    category,
    iniVoteDate,
    iniVoteTime
  }: ICreateAgendaDTO): Promise<HttpResponse> {
    try {
      const agenda = await this.prisma.$transaction(async (tx: any) => {
        return this.agendaRepositroy.create({
          title,
          description,
          category,
          iniVoteDate,
          iniVoteTime
        }, tx) 
      })

      return created(agenda)

    } catch(error) {
      return serverError(error as Error)
    }
  }

}

export { CreateAgendaUseCase}