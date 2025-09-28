import { IVoteRepository } from "@modules/vote/repositories/i-vote-repository";
import { PrismaClient } from "@prisma/client";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import { copyFile } from "fs";
import { inject, injectable } from "tsyringe";


@injectable()
class GenerateVotesUseCase {
  constructor(
    @inject('VoteRepository')
    private voteRepository: IVoteRepository,
    @inject('PrismaClient')
    private prisma: PrismaClient
  ){}

  private generateCpf(): string {
    const calculaDigito = (nums: number[], pesoInicial: number) => {
      let soma = 0;
      for (let i = 0; i < nums.length; i++) soma += nums[i] * (pesoInicial - i);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    while (true) {
      const nums: number[] = Array.from({ length: 9 }, () =>
        Math.floor(Math.random() * 10)
      );
      if (new Set(nums).size === 1) continue;
      const d1 = calculaDigito(nums, 10);
      const d2 = calculaDigito([...nums, d1], 11);
      const cpfArray = [...nums, d1, d2];
      if (new Set(cpfArray).size === 1) continue;
      return cpfArray.join("");
    }
  }

  async execute(numberOfVotes: number, sessionId: string): Promise<HttpResponse> {
    try {

      const votes = new Set<{cpf: string, vote: boolean}>()
      
      while (votes.size < numberOfVotes) {
        votes.add({
          cpf: this.generateCpf(),
          vote: Math.random() < 0.5 ? false : true
        })
      }

      for (const { cpf, vote } of votes) {
        await this.prisma.$transaction(async (tx: any) => {
          return this.voteRepository.makeVote({
            sessionId,
            cpf,
            vote
          }, tx)
        })
      }

      return ok(Array.from(votes))


    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { GenerateVotesUseCase }