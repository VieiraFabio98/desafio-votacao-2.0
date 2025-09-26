import { PrismaClient, Vote, VoteSession } from "@prisma/client";
import { IVoteRepository } from "../repositories/i-vote-repository";
import { ICreateVoteSessionDTO } from "../dto/i-create-vote-session-dto";
import { IMakeVoteDTO } from "../dto/i-make-vote-dto";


class VoteRepository implements IVoteRepository {
  async create(data: ICreateVoteSessionDTO, prismaClient: PrismaClient): Promise<VoteSession> {
    try {
      const session = await prismaClient.voteSession.create({
        data: {
          agendaId: data.agendaId,
          endedAt: data.endedAt
        }
      })

      return session
      
    } catch(error) {
      throw error
    }
  }

  async makeVote(data: IMakeVoteDTO, prismaClient: PrismaClient): Promise<Vote> {
    try {
      const vote = await prismaClient.vote.create({
        data: {
          voteSessionId: data.sessionId,
          cpf: data.cpf,
          vote: data.vote
        }
      })

      return vote
    } catch(error) {
      throw error
    }
  }

}

export { VoteRepository }