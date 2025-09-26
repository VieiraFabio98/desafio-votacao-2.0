import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { MakeVoteUseCase } from "./make-vote-use-case";


@injectable()
class MakeVoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sessionId } = request.params
    const { cpf, vote } = request.body

    const makeVoteUseCase = container.resolve(MakeVoteUseCase)

    const result = await makeVoteUseCase.execute({sessionId, cpf, vote})

    return response.status(result.statusCode).json(result)

  }
}

export { MakeVoteController }