import { Prisma, PrismaClient, Vote, VoteSession } from "@prisma/client"
import { ICreateVoteSessionDTO } from "../dto/i-create-vote-session-dto"
import { IMakeVoteDTO } from "../dto/i-make-vote-dto"


interface IVoteRepository {
  create(data: ICreateVoteSessionDTO, prismaClient: PrismaClient): Promise<VoteSession>
  makeVote(data: IMakeVoteDTO, prismaClient: PrismaClient):Promise<Vote>
  verifyVote(sessionId: String, cpf: string): Promise<Boolean>
  verifySessionStillOpen(sessionId: string, date: Date): Promise<Boolean>
  countVotes(sessionId: string): Promise<any>
  updateTotalVotes(sessionId: string, totalVotes: number): Promise<void>
}

export { IVoteRepository }