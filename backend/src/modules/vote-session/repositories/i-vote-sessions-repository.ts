import { PrismaClient, VoteSession } from "@prisma/client"
import { ICreateVoteSessionDTO } from "../dto/i-create-vote-session-dto"


interface IVoteSessionsRepository {
  create(data: ICreateVoteSessionDTO, prismaClient: PrismaClient): Promise<VoteSession>
}

export { IVoteSessionsRepository }