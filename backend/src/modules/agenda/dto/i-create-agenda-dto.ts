import { Category } from "@prisma/client"

interface ICreateAgendaDTO {
  title: string
  description: string
  category: Category
  iniVoteDate: Date
}

export { ICreateAgendaDTO }
