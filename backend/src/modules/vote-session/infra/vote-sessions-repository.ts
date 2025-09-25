import { PrismaClient, VoteSession } from "@prisma/client";
import { IVoteSessionsRepository } from "../repositories/i-vote-sessions-repository";
import { ICreateVoteSessionDTO } from "../dto/i-create-vote-session-dto";


class VoteSessionsRepository implements IVoteSessionsRepository {
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

}

export { VoteSessionsRepository }