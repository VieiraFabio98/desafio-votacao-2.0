import { PrismaClient, Vote, VoteSession } from "@prisma/client"
import { IVoteRepository } from "../repositories/i-vote-repository"
import { ICreateVoteSessionDTO } from "../dto/i-create-vote-session-dto"
import { IMakeVoteDTO } from "../dto/i-make-vote-dto"

const prisma = new PrismaClient()

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
          vote: data.vote,
          createdAt: data.createdAt ?? new Date()
        }
      })

      return vote
    } catch(error) {
      throw error
    }
  }
  
  async verifyVote(sessionId: string, cpf: string): Promise<Boolean> {
      try {
        const voteAlreadyExists = await prisma.vote.findFirst({
          where: {
            voteSessionId: sessionId,
            cpf: cpf
          }
        })

        return !!voteAlreadyExists
      } catch(error) {
        throw error
      }
  }

  async verifySessionStillOpen(sessionId: string, date: Date): Promise<boolean> {
    try {
      const sessionStillOpen = await prisma.voteSession.findFirst({
        where: {
          id: sessionId,
          endedAt: { gt: date }
        }
      })

      return !!sessionStillOpen

    } catch (error) {
      throw error
    }
  }

  async countVotes(sessionId: string): Promise<any> {
    try {
      const groupedVotes = await prisma.vote.groupBy({
        by: ['vote'],
        _count: {vote: true},
        where: {voteSessionId: sessionId}
      })

      return groupedVotes
    } catch(error) {
      throw error
    }
  }

  async updateTotalVotes(sessionId: string, totalVotes: number): Promise<void> {
    try {
      await prisma.voteSession.update({
        data: {totalVotes: totalVotes},
        where: {id: sessionId}
      })
    } catch(error) {
      console.log('Erro ao Atualizar total de votos da sessão')
      throw error
    }
  }

}

export { VoteRepository }