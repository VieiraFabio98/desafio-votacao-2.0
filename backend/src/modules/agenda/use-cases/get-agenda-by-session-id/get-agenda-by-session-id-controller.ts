import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { GetAgendaBySessionIdUseCase } from "./get-agenda-by-session-id-use-case";


@injectable()
class GetAgendaBySessionIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sessionId } = request.params

    const getAgendaBySessionIdUseCase = container.resolve(GetAgendaBySessionIdUseCase)

    const result = await getAgendaBySessionIdUseCase.execute(sessionId)

    return response.status(result.statusCode).json(result)
  }
}

export { GetAgendaBySessionIdController }