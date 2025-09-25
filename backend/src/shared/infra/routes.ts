import { CreateAgendaController } from "@modules/agenda/use-cases/create-agenda/create-agenda-controller"
import { Router } from "express";
import { container } from "tsyringe"
import '@shared/container'
import { ListAgendaController } from "@modules/agenda/use-cases/list-agenda/list-agenda-controller";
import { CreateVoteSessionsController } from "@modules/vote-session/use-cases/create/create-vote-sessions-controller";


const router = Router()

const createAgendaController = container.resolve(CreateAgendaController)
const listAgendaController = container.resolve(ListAgendaController)
const createVoteSessionsController = container.resolve(CreateVoteSessionsController)

router.post('/agendas', createAgendaController.handle)
router.post('/agendas/list', listAgendaController.handle)
router.post('/start-vote-sessions', createVoteSessionsController.handle)

export { router }