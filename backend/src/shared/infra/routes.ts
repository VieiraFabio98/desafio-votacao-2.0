import { CreateAgendaController } from "@modules/agenda/use-cases/create-agenda/create-agenda-controller"
import { Router } from "express";
import { container } from "tsyringe"
import '@shared/container'


const router = Router()

const createAgendaController = container.resolve(CreateAgendaController)

router.post('/agendas', createAgendaController.handle)

export { router }