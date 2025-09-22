import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { CreateAgendaUseCase } from "./create-agenda-use-case";

@injectable()
class CreateAgendaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, category, iniVoteDate } = request.body

    const createAgendaUseCase = container.resolve(CreateAgendaUseCase)

    const result = await createAgendaUseCase.execute({
      title,
      description,
      category,
      iniVoteDate
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateAgendaController}