import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { ListAgendaUseCase } from "./list-agenda-use-case";


@injectable()
class ListAgendaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listAgendaUseCase = container.resolve(ListAgendaUseCase)

    const result = await listAgendaUseCase.execute({
      search,
      page,
      pageSize,
      order,
      filter
    })

    return response.status(result.statusCode).json(result)
  }
}

export { ListAgendaController }