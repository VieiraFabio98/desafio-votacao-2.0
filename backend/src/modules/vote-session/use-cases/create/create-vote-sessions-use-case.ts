import { IStartVoteSessionDTO } from "@modules/vote-session/dto/i-start-vote-session-dto";
import { IVoteSessionsRepository } from "@modules/vote-session/repositories/i-vote-sessions-repository";
import { PrismaClient } from "@prisma/client";
import { created, HttpResponse, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateVoteSessionsUseCase {
  constructor(
    @inject('VoteSessionsRepository')
    private voteSessionsRepository: IVoteSessionsRepository,
    @inject('PrismaClient')
        private prisma: PrismaClient
  ){}

  async execute({
    agendaId,
    durationInMinutes,
  }:IStartVoteSessionDTO): Promise<HttpResponse> {
    try {
      const startSession: any = await this.prisma.$transaction(async (tx: any) => {
        const minutes = parseInt(durationInMinutes, 10) || 1
        const endedAt = new Date(Date.now() + minutes * 60_000)

        const session = await this.voteSessionsRepository.create({
          agendaId,
          endedAt: endedAt,
        }, tx)

        const voteLink = `${process.env.APP_FRONT_URL}/votacao/${session.id}`

        return { ...session, voteLink }
      })


      console.log(startSession)
  
      return created(startSession)

    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { CreateVoteSessionsUseCase }