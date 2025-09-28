import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { GenerateVotesUseCase } from "./generate-votes-use-case";


@injectable()
class GenerateVotesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { numberOfVotes, sessionId } = request.body

    const generateVotesUseCase = container.resolve(GenerateVotesUseCase)

    const result = await generateVotesUseCase.execute(numberOfVotes, sessionId)

    return response.status(result.statusCode).json(result)
  }

}

export { GenerateVotesController }