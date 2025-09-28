import { IVoteRepository } from "@modules/vote/repositories/i-vote-repository";
import { PrismaClient } from "@prisma/client";
import { HttpResponse, ok, serverError } from "@shared/helpers";
import { inject, injectable } from "tsyringe";
import amqplib from "amqplib"


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

  private async publishToQueue(vote: {cpf: string, vote: boolean, sessionId: string}) {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL || "amqp://admin:admin@localhost:5672")
    const channel = await connection.createChannel()
    const queue = 'votes'

    await channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(vote)), { persistent: true })

    await channel.close()
    await connection.close()
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
        await this.publishToQueue({ cpf, vote, sessionId })
      }

      return ok({ message: "Votos enviados para processamento", total: votes.size })
      
    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { GenerateVotesUseCase }