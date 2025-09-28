import amqplib from "amqplib"
import { PrismaClient, Prisma } from "@prisma/client"
import { VoteRepository } from "../infra/vote-repository"

const prisma = new PrismaClient()
const voteRepository = new VoteRepository()

async function consumeVotes() {
  const connection = await amqplib.connect(process.env.RABBITMQ_URL || "amqp://admin:admin@localhost:5672")
  const channel = await connection.createChannel()
  const queue = "votes"

  await channel.assertQueue(queue, { durable: true })
  channel.prefetch(1)

  console.log('Aguardando votos na fila...')

  channel.consume(queue, async (message) => {
    if(!message) return

    const { cpf, vote, sessionId } = JSON.parse(message.content.toString())

    try {
      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await voteRepository.makeVote({ cpf, vote, sessionId }, tx as any)
      })
      channel.ack(message)
    } catch (err) {
      console.error("Erro ao processar voto:", err)
      channel.nack(message, false, true)
    }
  })
}

consumeVotes().catch(console.error)