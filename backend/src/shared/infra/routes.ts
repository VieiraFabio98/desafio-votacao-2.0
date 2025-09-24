import { CreateAgendaController } from "@modules/agenda/use-cases/create-agenda/create-agenda-controller"
import { Router } from "express";
import { container } from "tsyringe"
import '@shared/container'
import { ListAgendaController } from "@modules/agenda/use-cases/list-agenda/list-agenda-controller";


const router = Router()

const createAgendaController = container.resolve(CreateAgendaController)
const listAgendaController = container.resolve(ListAgendaController)

router.post('/agendas', createAgendaController.handle)
router.post('/agendas/list', listAgendaController.handle)

export { router }