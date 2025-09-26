import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { CreateVoteSessionsUseCase } from "./create-vote-sessions-use-case";


@injectable()
class CreateVoteSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {agendaId, durationInMinutes} = request.body

    const createVoteSessionsUseCase = container.resolve(CreateVoteSessionsUseCase)

    const result = await createVoteSessionsUseCase.execute({
      agendaId,
      durationInMinutes
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateVoteSessionsController }