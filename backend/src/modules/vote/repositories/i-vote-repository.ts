import { Prisma, PrismaClient, Vote, VoteSession } from "@prisma/client"
import { ICreateVoteSessionDTO } from "../dto/i-create-vote-session-dto"
import { IMakeVoteDTO } from "../dto/i-make-vote-dto"


interface IVoteRepository {
  create(data: ICreateVoteSessionDTO, prismaClient: PrismaClient): Promise<VoteSession>
  makeVote(data: IMakeVoteDTO, prismaClient: PrismaClient):Promise<Vote>
}

export { IVoteRepository }