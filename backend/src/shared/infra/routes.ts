import { CreateAgendaController } from "@modules/agenda/use-cases/create-agenda/create-agenda-controller"
import { Router } from "express";
import { container } from "tsyringe"
import '@shared/container'
import { ListAgendaController } from "@modules/agenda/use-cases/list-agenda/list-agenda-controller";
import { CreateVoteSessionsController } from "@modules/vote/use-cases/create-vote-session/create-vote-sessions-controller";
import { MakeVoteController } from "@modules/vote/use-cases/make-vote/make-vote-controller";
import { GetAgendaBySessionIdController } from "@modules/agenda/use-cases/get-agenda-by-session-id/get-agenda-by-session-id-controller";
import { GenerateVotesController } from "@modules/vote/use-cases/generate-votes/generate-votes-controller";


const router = Router()

const createAgendaController = container.resolve(CreateAgendaController)
const listAgendaController = container.resolve(ListAgendaController)
const createVoteSessionsController = container.resolve(CreateVoteSessionsController)
const makeVoteController = container.resolve(MakeVoteController)
const getagendaBySessionIdController = container.resolve(GetAgendaBySessionIdController)
const generateVotesController = container.resolve(GenerateVotesController)

router.post('/agendas', createAgendaController.handle)
router.post('/agendas/list', listAgendaController.handle)
router.post('/start-vote-sessions', createVoteSessionsController.handle)
router.post('/make-vote/:sessionId', makeVoteController.handle)
router.get('/get-agenda-by-session-id/:sessionId', getagendaBySessionIdController.handle)
router.post('/generate-votes', generateVotesController.handle)


export { router }