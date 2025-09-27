import { IAgendaRepository } from "@modules/agenda/repositories/i-agenda-repository";
import { IMakeVoteDTO } from "@modules/vote/dto/i-make-vote-dto";
import { IVoteRepository } from "@modules/vote/repositories/i-vote-repository";
import { PrismaClient } from "@prisma/client";
import { conflictError, created, HttpResponse, serverError } from "@shared/helpers";
import { verify } from "crypto";
import { inject, injectable } from "tsyringe";


@injectable()
class MakeVoteUseCase {
  constructor(
    @inject('VoteRepository')
    private voteRepository: IVoteRepository,
    @inject('PrismaClient')
    private prisma: PrismaClient
  ){}

  async execute({
    sessionId,
    cpf,
    vote
  }: IMakeVoteDTO): Promise<HttpResponse> {
    try {

      const sessionStillOpen = await this.voteRepository.verifySessionStillOpen(sessionId, new Date(Date.now()))
      const voteAlreadyExists = await this.voteRepository.verifyVote(sessionId, cpf)

      if(!sessionStillOpen) {
        return conflictError("Sessão finalizada")
      }
      
      if(voteAlreadyExists) {
        return conflictError("Voto já realizado")
      }

      const makeVote = await this.prisma.$transaction(async (tx: any) => {
        return this.voteRepository.makeVote({
          sessionId,
          cpf,
          vote
        }, tx)
      })

      return created(makeVote)

    } catch(error){
      return serverError(error as Error)
    }
  }
}

export { MakeVoteUseCase }