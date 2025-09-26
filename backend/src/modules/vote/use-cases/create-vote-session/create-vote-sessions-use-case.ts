import { IStartVoteSessionDTO } from "@modules/vote/dto/i-start-vote-session-dto";
import { IVoteRepository } from "@modules/vote/repositories/i-vote-repository";
import { PrismaClient } from "@prisma/client";
import { created, HttpResponse, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateVoteSessionsUseCase {
  constructor(
    @inject('VoteRepository')
    private voteRepository: IVoteRepository,
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

        const session = await this.voteRepository.create({
          agendaId,
          endedAt: endedAt,
        }, tx)

        const voteLink = `${process.env.APP_FRONT_URL}/votacao/${session.id}`

        return { ...session, voteLink }
      })

      return created(startSession)

    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { CreateVoteSessionsUseCase }