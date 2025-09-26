import { IAgendaRepository } from "@modules/agenda/repositories/i-agenda-repository";
import { HttpResponse, serverError, ok } from "@shared/helpers";
import { inject, injectable } from "tsyringe";

@injectable()
class GetAgendaBySessionIdUseCase {
  constructor(
    @inject('AgendaRepository')
    private agendaRepository: IAgendaRepository
  ){}

  async execute(sessionId: string): Promise<HttpResponse> {
    try {

      const agenda = await this.agendaRepository.getBySessionId(sessionId)

      return ok(agenda)

    } catch(error) {
      return serverError(error as Error)
    }
  }
}

export { GetAgendaBySessionIdUseCase }