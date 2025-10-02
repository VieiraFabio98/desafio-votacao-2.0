import { IStartVoteSessionDTO } from "@modules/vote/dto/i-start-vote-session-dto";
import { IVoteRepository } from "@modules/vote/repositories/i-vote-repository";
import { PrismaClient } from "@prisma/client";
import { created, HttpResponse, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";
import { schedulerService } from "@shared/infra/scheduler/scheduler-service"
import { IAgendaRepository } from "@modules/agenda/repositories/i-agenda-repository";


@injectable()
class CreateVoteSessionsUseCase {
  constructor(
    @inject('VoteRepository')
    private voteRepository: IVoteRepository,
    @inject('PrismaClient')
    private prisma: PrismaClient,
    @inject('AgendaRepository')
    private agendaRepository: IAgendaRepository
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

        const voteCountRunAt = new Date(endedAt.getTime() + 1000)

        schedulerService.scheduleJob(session.id, voteCountRunAt, async() => {
          console.log(`Votação ${session.id} encerrada.`)
          const countedVotes = await this.voteRepository.countVotes(session.id)
          
          let inFavor = 0
          let against = 0

          for(const row of countedVotes){
            if(row.vote) {
              inFavor = row._count.vote
            } else {
              against = row._count.vote
            }
          }

          const totalVotes = inFavor + against
          await this.voteRepository.updateTotalVotes(session.id, totalVotes)

          const status = inFavor > against ? 'APROVADO' : inFavor < against ? 'RECUSADO' : 'EMPATE'
          await this.agendaRepository.updateStatus(session.agendaId, status)
        })

        return { ...session, voteLink }
      })

      return created(startSession)

    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { CreateVoteSessionsUseCase }